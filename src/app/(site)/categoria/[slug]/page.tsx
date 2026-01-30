import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ProductCard } from '@/components/ProductCard'
import { getCategoryBySlug, getProductsByCategory, categories } from '@/data/products'
import { Filter, ChevronDown, SlidersHorizontal, ArrowLeft } from 'lucide-react'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  
  if (!category) {
    notFound()
  }
  
  const categoryProducts = getProductsByCategory(slug)

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20 md:pb-12">
      {/* Category Hero */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${category.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <Link 
              href="/produtos" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Loja
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
              {category.name}
            </h1>
            <p className="text-white/80 text-sm md:text-base max-w-xl">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 font-medium">
              <strong className="text-gray-900">{categoryProducts.length}</strong> produtos encontrados
            </p>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition-colors md:hidden">
                <Filter className="w-4 h-4" />
                Filtrar
              </button>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 hidden sm:inline">Ordenar:</span>
                <select className="appearance-none bg-white border border-gray-200 rounded-lg py-2 pl-3 pr-8 text-sm font-medium focus:outline-none focus:border-colorado-red cursor-pointer">
                  <option>Relevância</option>
                  <option>Menor Preço</option>
                  <option>Maior Preço</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products */}
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {categoryProducts.map((product, index) => (
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
          ) : (
            <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 border-dashed">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Nenhum produto encontrado
              </h2>
              <p className="text-gray-500 mb-6">
                Estamos reabastecendo esta categoria. Volte em breve!
              </p>
              <Link 
                href="/produtos" 
                className="inline-flex items-center justify-center px-6 py-3 bg-colorado-red text-white font-semibold rounded-xl hover:bg-colorado-red-dark transition-colors shadow-lg hover:shadow-xl"
              >
                Ver outros produtos
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
