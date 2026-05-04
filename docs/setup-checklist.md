# v1 Admin Dashboard — Setup Checklist

## 1. Create Supabase project
- Go to https://supabase.com → New Project
- Choose name, set a strong database password, pick a region close to NY
- Wait for the project to spin up (~2 minutes)

## 2. Run the SQL setup script
- In the Supabase Dashboard, go to SQL Editor
- Open and run the entire script from `docs/supabase-setup.sql`
- Verify: the `orders` table appears in the Table Editor, and the `order_status` enum exists in Database → Types

## 3. Configure environment variables
- In your local `.env.local` (create from `.env.example`):
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
  ```
- Both values are in Supabase Dashboard → Settings → API
- Deploy the same env vars to your Vercel project

## 4. Create the admin user
- **IMPORTANT:** Use the Supabase Dashboard only. Do NOT create the user via raw SQL — it leaves required `auth.users` columns NULL, which breaks `signInWithPassword`.
- In Supabase Dashboard → Authentication → Users → Add User
- Enter the admin email and password
- Check "Auto Confirm User" (skip email verification)
- This user will be able to log in at `/admin/login`

## 5. Deploy to Vercel
- Push the code to your GitHub repo
- In Vercel: Import the repo, add the two `NEXT_PUBLIC_` env vars
- Deploy
- Verify: visit the site → menu works, cart works, checkout places orders
- Visit `/admin` → redirects to `/admin/login` → log in → dashboard appears

## 6. Verify end-to-end
1. Visit the customer site → browse menu → add items → checkout → place order
2. Open `/admin` in another tab → new order appears in realtime (no refresh)
3. Click through status transitions (New → Preparing → Ready → Done)
4. Cancel an order with the confirm dialog
5. Open dashboard in two browser tabs → status change in one tab appears in the other
6. Log out → redirects to `/admin/login`
7. Hit `/admin` directly without session → redirects to `/admin/login`

## Troubleshooting

**Orders not appearing in dashboard:**
- Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Check the Supabase SQL Editor — run `SELECT * FROM orders ORDER BY created_at DESC LIMIT 5` to verify orders are being inserted
- Check the browser console for any Supabase client errors

**Login not working:**
- Verify the admin user exists in Supabase Authentication → Users
- Check that "Auto Confirm User" was enabled when creating the user
- Try the password reset flow in the Supabase Dashboard

**Realtime not working:**
- Verify Supabase Realtime is enabled (it is by default)
- Ensure `ALTER PUBLICATION supabase_realtime ADD TABLE orders;` was run (included in the setup SQL)
- In Supabase Dashboard → Database → Replication, confirm the `orders` table is listed under the `supabase_realtime` publication
- If the table was recreated after setup, re-run `ALTER PUBLICATION supabase_realtime ADD TABLE orders;`
