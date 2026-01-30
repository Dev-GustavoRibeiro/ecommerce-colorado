import Link from 'next/link'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-gray-50/50 flex items-center justify-center px-4 pb-20 md:pb-0">
      <div className="max-w-lg w-full text-center">
        {/* Illustration */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          <div className="absolute inset-0 bg-red-50 rounded-full animate-pulse opacity-50"></div>
          <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
            <Search className="w-16 h-16 text-gray-300" />
          </div>
          <div className="absolute top-0 right-4 bg-colorado-yellow text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm rotate-12">
            404
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Página não encontrada
        </h1>
        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
          Ops! A página que você está procurando pode ter sido removida ou o link está incorreto.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="btn-primary w-full sm:w-auto"
          >
            <Home className="w-5 h-5" />
            Voltar para o Início
          </Link>
          <Link 
            href="/produtos"
            className="btn-outline w-full sm:w-auto bg-white"
          >
            <ArrowLeft className="w-5 h-5" />
            Ver Produtos
          </Link>
        </div>
      </div>
    </div>
  )
}
