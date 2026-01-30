'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { useCartStore } from '@/store/cart'

interface ProductCardProps {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  image: string
  featured?: boolean
  rating?: number
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  originalPrice,
  image,
  featured,
  rating = 4.5,
}: ProductCardProps) {
  const { addItem, openCart } = useCartStore()
  
  const discount = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : 0

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id,
      name,
      slug,
      price,
      originalPrice,
      image,
    })
    openCart()
  }

  return (
    <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Image */}
      <Link href={`/produto/${slug}`} className="block relative aspect-square bg-gray-50">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discount > 0 && (
            <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
          {featured && (
            <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-1 rounded">
              Destaque
            </span>
          )}
        </div>

        {/* Favorite Button (Hidden on mobile usually, visible here for access) */}
        <button 
          className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-colors shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Adicionar aos favoritos"
        >
          <Heart className="w-4 h-4" />
        </button>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Name */}
        <Link href={`/produto/${slug}`} className="flex-1">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-colorado-red transition-colors">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-gray-500">{rating}</span>
        </div>

        {/* Price */}
        <div className="mt-auto">
          {originalPrice && (
            <p className="text-xs text-gray-400 line-through">
              {formatPrice(originalPrice)}
            </p>
          )}
          <div className="flex items-center justify-between gap-2">
            <p className="text-lg font-bold text-gray-900">
              {formatPrice(price)}
            </p>
            <button
              onClick={handleAddToCart}
              className="p-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-colorado-red hover:text-white transition-colors"
              aria-label="Adicionar ao carrinho"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-gray-500 mt-1">
            ou 12x de {formatPrice(price/12)}
          </p>
        </div>
      </div>
    </div>
  )
}
