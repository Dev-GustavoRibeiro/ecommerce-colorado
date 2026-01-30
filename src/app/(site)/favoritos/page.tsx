'use client'

import { useFavoritesStore } from '@/store/favorites'
import { ProductCard } from '@/components/ProductCard'
import Link from 'next/link'
import { Heart, ArrowLeft } from 'lucide-react'

export default function FavoritesPage() {
  const { items } = useFavoritesStore()

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20 md:pb-12">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-4">
             <Link href="/" className="text-gray-500 hover:text-colorado-red transition-colors text-sm flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-colorado-red fill-current" />
            <h1 className="text-3xl font-bold text-gray-900">Meus Favoritos</h1>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
              {items.length}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-gray-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Sua lista de favoritos está vazia
            </h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Salve os produtos que você mais gostou aqui para ver depois.
            </p>
            <Link 
              href="/produtos" 
              className="inline-flex items-center justify-center px-6 py-3 bg-colorado-red text-white font-bold rounded-xl hover:bg-colorado-red-dark transition-colors shadow-lg shadow-red-100"
            >
              Explorar Produtos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {items.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                slug={item.slug}
                price={item.price}
                originalPrice={item.originalPrice}
                image={item.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
