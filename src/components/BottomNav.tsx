'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Grid, ShoppingCart, User, Heart } from 'lucide-react'
import { useCartStore } from '@/store/cart'

export function BottomNav() {
  const pathname = usePathname()
  const { totalItems, openCart } = useCartStore()
  const cartItemsCount = totalItems()

  const navItems = [
    { name: 'Início', href: '/', icon: Home },
    { name: 'Produtos', href: '/produtos', icon: Grid },
    { name: 'Favoritos', href: '/favoritos', icon: Heart },
    { name: 'Conta', href: '/login', icon: User },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe pt-2 px-6 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center h-14">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 w-16 transition-colors ${
                isActive ? 'text-colorado-red' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <item.icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          )
        })}
        
        {/* Cart Button (Special) */}
        <button
          onClick={openCart}
          className="flex flex-col items-center justify-center gap-1 w-16 text-gray-400 hover:text-gray-600 relative"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" strokeWidth={1.5} />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-colorado-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Carrinho</span>
        </button>
      </div>
    </div>
  )
}
