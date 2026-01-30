import { ProductCard } from '@/components/ProductCard'
import { products } from '@/data/products'
import Link from 'next/link'
import { Flame, Clock, ArrowRight } from 'lucide-react'

export default function OffersPage() {
  const saleProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price)

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20 md:pb-12">
      {/* Offers Hero */}
      <div className="relative bg-gradient-to-r from-red-600 to-orange-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-white/20">
            <Flame className="w-4 h-4 text-yellow-300 fill-current" />
            Ofertas Relâmpago
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            Preços baixos <br className="md:hidden" />
            <span className="text-yellow-300">de verdade!</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Separamos as melhores oportunidades para você economizar. 
            Corra que o estoque é limitado!
          </p>
          
          {/* Countdown Mock */}
          <div className="flex justify-center gap-4 text-white">
            <div className="flex flex-col items-center bg-black/20 backdrop-blur-md rounded-xl p-3 w-20 border border-white/10">
              <span className="text-2xl font-bold font-mono">02</span>
              <span className="text-[10px] uppercase tracking-wider opacity-80">Dias</span>
            </div>
            <div className="flex flex-col items-center bg-black/20 backdrop-blur-md rounded-xl p-3 w-20 border border-white/10">
              <span className="text-2xl font-bold font-mono">14</span>
              <span className="text-[10px] uppercase tracking-wider opacity-80">Horas</span>
            </div>
            <div className="flex flex-col items-center bg-black/20 backdrop-blur-md rounded-xl p-3 w-20 border border-white/10">
              <span className="text-2xl font-bold font-mono">35</span>
              <span className="text-[10px] uppercase tracking-wider opacity-80">Min</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-50 rounded-xl">
                <Clock className="w-6 h-6 text-colorado-red" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Produtos em Oferta
                </h2>
                <p className="text-sm text-gray-500">
                  {saleProducts.length} itens com desconto
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-sm text-gray-500 whitespace-nowrap hidden md:inline">Ordenar:</span>
              <select className="w-full md:w-auto appearance-none bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-4 pr-10 text-sm font-medium focus:outline-none focus:border-colorado-red cursor-pointer">
                <option>Maior Desconto</option>
                <option>Menor Preço</option>
                <option>Mais Vendidos</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {saleProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  price={product.price}
                  originalPrice={product.originalPrice ?? undefined}
                  image={product.images[0]}
                  featured={product.featured}
                />
              </div>
            ))}
          </div>

          {saleProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                Nenhuma oferta disponível no momento.
              </p>
              <Link 
                href="/produtos" 
                className="text-colorado-red font-semibold mt-4 inline-flex items-center gap-2 hover:underline"
              >
                Ver todos os produtos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
