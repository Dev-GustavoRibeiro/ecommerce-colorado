'use client'

import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCartStore()
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl animate-slide-in flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-colorado-red" />
            <h2 className="text-xl font-bold">Seu Carrinho</h2>
          </div>
          <button 
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Seu carrinho está vazio
              </h3>
              <p className="text-gray-500 mb-6">
                Adicione produtos para continuar comprando
              </p>
              <button 
                onClick={closeCart}
                className="btn-primary"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li 
                  key={item.id} 
                  className="flex gap-4 bg-gray-50 rounded-lg p-3"
                >
                  <div className="relative w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link 
                      href={`/produto/${item.slug}`}
                      onClick={closeCart}
                      className="font-medium text-sm hover:text-colorado-red transition-colors line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <div className="mt-1">
                      {item.originalPrice && (
                        <span className="text-xs text-gray-400 line-through mr-2">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                      <span className="text-colorado-red font-bold">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-colorado-red transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatPrice(totalPrice())}</span>
            </div>
            
            {/* Frete */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Frete</span>
              <span className="text-colorado-green font-medium">Grátis</span>
            </div>
            
            {/* Total */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="text-lg font-bold">Total</span>
              <span className="text-2xl font-bold text-colorado-red">
                {formatPrice(totalPrice())}
              </span>
            </div>
            
            {/* Parcelamento */}
            <p className="text-sm text-gray-500 text-center">
              em até <span className="font-semibold text-colorado-green">12x sem juros</span>
            </p>
            
            {/* Actions */}
            <div className="space-y-2">
              <Link 
                href="/carrinho"
                onClick={closeCart}
                className="btn-primary w-full text-center block"
              >
                Finalizar Compra
              </Link>
              <button 
                onClick={closeCart}
                className="btn-outline w-full"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
