'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-display-md text-white text-balance text-center mb-2">
          Guerrero
        </h1>
        <p className="text-body-sm text-tertiary text-center mb-3xl">
          Admin sign in
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-body-xs text-red-300">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-body-sm text-white/60 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white placeholder:text-white/25 text-body-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-colors duration-base"
              placeholder="admin@guerrerotaqueria.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-body-sm text-white/60 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white placeholder:text-white/25 text-body-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-colors duration-base"
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" variant="terra" size="md" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  )
}
