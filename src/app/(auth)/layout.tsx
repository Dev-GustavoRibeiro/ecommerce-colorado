import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-admin-bg via-admin-sidebar to-admin-bg relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-colorado-red/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-20 w-64 h-64 bg-colorado-yellow/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-colorado-green/15 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-xl gradient-colorado flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">COLORADO</h1>
            <p className="text-admin-muted text-xs">Móveis & Eletros</p>
          </div>
        </Link>
      </header>

      {/* Content */}
      <main className="relative z-10 flex items-center justify-center px-4 py-8" style={{ minHeight: 'calc(100vh - 100px)' }}>
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-admin-muted text-sm">
        <p>© 2026 Colorado Móveis e Eletros. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
