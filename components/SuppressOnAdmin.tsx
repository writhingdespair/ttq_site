'use client'

import { usePathname } from 'next/navigation'

export default function SuppressOnAdmin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname && (pathname === '/admin' || pathname.startsWith('/admin/'))) {
    return null
  }

  return <>{children}</>
}
