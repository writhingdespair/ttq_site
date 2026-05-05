import Link from 'next/link'
import LogoutButton from '@/components/admin/LogoutButton'
import MuteToggle from '@/components/admin/MuteToggle'
import ShowHiddenToggle from '@/components/admin/ShowHiddenToggle'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-black">
      <header className="sticky top-0 z-sticky bg-black/95 backdrop-blur-md border-b border-white/[0.06]">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="font-display text-lg font-semibold text-white no-underline">
              Guerrero
            </Link>
            <span className="text-label-sm text-tertiary">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <ShowHiddenToggle />
            <MuteToggle />
            <Link
              href="/"
              className="text-body-sm text-tertiary hover:text-white no-underline transition-colors"
            >
              View Site
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-4xl">{children}</main>
    </div>
  )
}
