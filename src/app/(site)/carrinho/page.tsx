'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowLeft,
  Truck,
  ShieldCheck,
  Tag
} from 'lucide-react'
import { useCartStore } from '@/store/cart'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore()

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const subtotal = totalPrice()
  const shipping = subtotal >= 299 ? 0 : 49.90
  const discount = 0
  const total = subtotal + shipping - discount
  const pixDiscount = total * 0.1
  const pixPrice = total - pixDiscount

  if (items.length === 0) {
    return (
      <div className="bg-gray-50/50 min-h-[80vh] flex flex-col items-center justify-center px-4 pb-20 md:pb-0">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
          <ShoppingBag className="w-10 h-10 text-gray-300" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Seu carrinho está vazio
        </h1>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Explore nossas ofertas e adicione itens incríveis ao seu carrinho.
        </p>
        <Link 
          href="/produtos" 
          className="bg-colorado-red text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-red-200 hover:shadow-xl hover:bg-colorado-red-dark transition-all transform hover:-translate-y-0.5"
        >
          Começar a Comprar
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50/50 min-h-screen pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/produtos" className="p-2 hover:bg-white rounded-full transition-colors md:hidden">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Meu Carrinho
            <span className="text-base font-normal text-gray-500 ml-3">
              {items.length} {items.length === 1 ? 'item' : 'itens'}
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex gap-4 md:gap-6 animate-fade-in"
              >
                {/* Image */}
                <Link 
                  href={`/produto/${item.slug}`}
                  className="relative w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between min-w-0 py-1">
                  <div className="flex justify-between items-start gap-4">
                    <Link 
                      href={`/produto/${item.slug}`}
                      className="font-semibold text-gray-900 hover:text-colorado-red transition-colors line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      aria-label="Remover item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-l-lg transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-semibold text-sm bg-white h-8 flex items-center justify-center border-x border-gray-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-r-lg transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      {item.originalPrice && (
                        <p className="text-xs text-gray-400 line-through">
                          {formatPrice(item.originalPrice * item.quantity)}
                        </p>
                      )}
                      <p className="text-lg font-bold text-colorado-red">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button 
              onClick={clearCart}
              className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-2 px-2"
            >
              <Trash2 className="w-4 h-4" />
              Limpar Carrinho
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Resumo do Pedido</h2>

              {/* Coupon */}
              <div className="mb-6 relative">
                <input
                  type="text"
                  placeholder="Cupom de desconto"
                  className="w-full pl-10 pr-24 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-colorado-red focus:bg-white transition-all"
                />
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition-colors">
                  Aplicar
                </button>
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-4 border-t border-dashed border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Frete</span>
                  {shipping === 0 ? (
                    <span className="font-bold text-green-600">Grátis</span>
                  ) : (
                    <span className="font-medium text-gray-900">{formatPrice(shipping)}</span>
                  )}
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Desconto</span>
                    <span className="font-bold text-green-600">-{formatPrice(discount)}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-gray-200">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-base font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-colorado-red">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-gray-500 text-right">
                  ou 12x de {formatPrice(total / 12)}
                </p>
              </div>

              {/* Pix Box */}
              <div className="mt-4 bg-green-50 rounded-xl p-4 border border-green-100">
                <p className="text-green-700 font-bold text-sm flex items-center gap-2 mb-1">
                  <span className="text-lg">🤑</span>
                  Economize no Pix
                </p>
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-bold text-green-700">{formatPrice(pixPrice)}</span>
                  <span className="text-xs text-green-600 font-medium">10% OFF</span>
                </div>
              </div>

              <button className="w-full bg-colorado-green text-white font-bold py-4 rounded-xl shadow-lg hover:bg-colorado-green-dark hover:shadow-xl transition-all transform hover:-translate-y-0.5 mt-6 flex items-center justify-center gap-2">
                Finalizar Compra
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Trust */}
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>Compra 100% segura e protegida</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Entrega rápida para todo o Brasil</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
