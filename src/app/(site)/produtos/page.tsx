'use client'

import { useState } from 'react'
import { ProductCard } from '@/components/ProductCard'
import { categories, products } from '@/data/products'
import Link from 'next/link'
import { Filter, ChevronDown, SlidersHorizontal, X } from 'lucide-react'

export default function ProductsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20 md:pb-12">
      {/* Breadcrumb & Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-colorado-red transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Todos os Produtos</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                Todos os Produtos
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {products.length} itens encontrados
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="flex md:hidden gap-2">
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg py-2.5 text-sm font-medium shadow-sm active:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                Filtrar
              </button>
              <div className="flex-1 relative">
                <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg py-2.5 pl-3 pr-8 text-sm font-medium shadow-sm focus:outline-none focus:border-colorado-red">
                  <option>Mais Relevantes</option>
                  <option>Menor Preço</option>
                  <option>Maior Preço</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Desktop Sort */}
            <div className="hidden md:flex items-center gap-3">
              <label className="text-sm text-gray-500">Ordenar por:</label>
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-200 rounded-lg py-2 pl-4 pr-10 text-sm font-medium shadow-sm hover:border-gray-300 focus:outline-none focus:border-colorado-red cursor-pointer min-w-[180px]">
                  <option>Mais Relevantes</option>
                  <option>Menor Preço</option>
                  <option>Maior Preço</option>
                  <option>Melhor Avaliação</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters (Desktop) */}
          <aside className={`
            fixed inset-0 z-50 bg-white lg:bg-transparent lg:static lg:z-0 lg:w-64 flex-shrink-0 transition-transform duration-300 ease-in-out lg:translate-x-0
            ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            {/* Mobile Header */}
            <div className="flex lg:hidden items-center justify-between p-4 border-b border-gray-100">
              <h2 className="font-bold text-lg">Filtros</h2>
              <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 lg:p-0 overflow-y-auto h-[calc(100vh-60px)] lg:h-auto lg:overflow-visible">
              <div className="lg:bg-white lg:rounded-xl lg:border lg:border-gray-200 lg:p-6 lg:sticky lg:top-24 space-y-8">
                
                {/* Categories */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    Categorias
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative flex items-center">
                          <input type="checkbox" className="peer appearance-none w-5 h-5 border border-gray-300 rounded checked:bg-colorado-red checked:border-colorado-red transition-all" />
                          <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600 group-hover:text-colorado-red transition-colors">
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="border-t border-gray-100 pt-6 lg:border-none lg:pt-0">
                  <h3 className="font-bold text-gray-900 mb-4">Preço</h3>
                  <div className="space-y-3">
                    {[
                      'Até R$ 100',
                      'R$ 100 a R$ 500',
                      'R$ 500 a R$ 1000',
                      'R$ 1000 a R$ 3000',
                      'Acima de R$ 3000'
                    ].map((range, i) => (
                      <label key={i} className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative flex items-center">
                          <input type="checkbox" className="peer appearance-none w-5 h-5 border border-gray-300 rounded checked:bg-colorado-red checked:border-colorado-red transition-all" />
                          <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600 group-hover:text-colorado-red transition-colors">
                          {range}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Mobile Filter Actions */}
                <div className="lg:hidden pt-6 mt-4 border-t border-gray-100">
                  <button 
                    onClick={() => setIsFilterOpen(false)}
                    className="w-full bg-colorado-red text-white font-bold py-3 rounded-xl shadow-lg"
                  >
                    Ver Resultados
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Overlay for mobile filter */}
          {isFilterOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
              onClick={() => setIsFilterOpen(false)}
            />
          )}

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
              {products.map((product, index) => (
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

            {/* Pagination */}
            <div className="flex justify-center mt-12 md:mt-16">
              <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                <button className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-colorado-red hover:bg-red-50 transition-colors disabled:opacity-50">
                  ←
                </button>
                {[1, 2, 3].map((page) => (
                  <button 
                    key={page}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      page === 1 
                        ? 'bg-colorado-red text-white shadow-md' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <span className="px-2 text-gray-400 text-sm">...</span>
                <button className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">
                  8
                </button>
                <button className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-colorado-red hover:bg-red-50 transition-colors">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
