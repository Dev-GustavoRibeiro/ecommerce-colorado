'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  Heart,
  MapPin,
  Phone,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Truck,
  Flame
} from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { CartDrawer } from './CartDrawer'
import { categories } from '@/data/products'

export function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const { totalItems, openCart } = useCartStore()
  const cartItemsCount = totalItems()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDepartmentsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <>
      {/* Top Bar - Functional Links */}
      <div className="hidden md:block bg-gradient-to-r from-gray-900 to-gray-800 text-white text-xs py-2.5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:1140028922" className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-colorado-red" />
              (11) 4002-8922
            </a>
            <Link href="/ajuda" className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors">
              <MapPin className="w-3.5 h-3.5 text-colorado-red" />
              Nossas Lojas
            </Link>
          </div>
          <div className="flex items-center gap-6 text-gray-300">
            <Link href="/ajuda" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <HelpCircle className="w-3.5 h-3.5" />
              Ajuda
            </Link>
            <Link href="/rastreamento" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Truck className="w-3.5 h-3.5" />
              Rastrear Pedido
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 md:gap-8 h-16 md:h-24">
            
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-colorado-red to-colorado-red-dark flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-lg shadow-red-200 group-hover:scale-105 transition-transform">
                C
              </div>
              <div className="hidden md:block">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-none group-hover:text-colorado-red transition-colors">COLORADO</h1>
                <p className="text-[10px] text-gray-500 font-medium tracking-wide uppercase mt-0.5">Móveis & Eletros</p>
              </div>
            </Link>

            {/* Mobile Search Button (Placeholder) */}
            <div className="md:hidden flex-1 flex justify-end">
               <div className="relative w-full max-w-[200px]">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full pl-3 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-colorado-red outline-none"
                />
                <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-2xl">
              <div className="relative w-full group">
                <input
                  type="text"
                  placeholder="O que você está procurando hoje?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-5 pr-14 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-colorado-red focus:bg-white focus:outline-none focus:shadow-lg focus:shadow-red-50 transition-all placeholder:text-gray-400"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-colorado-red text-white rounded-lg hover:bg-colorado-red-dark transition-colors shadow-md shadow-red-100">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/login" className="flex items-center gap-3 text-gray-700 hover:text-colorado-red transition-colors group">
                <div className="p-2 bg-gray-50 rounded-full group-hover:bg-red-50 transition-colors">
                  <User className="w-5 h-5 text-gray-600 group-hover:text-colorado-red" />
                </div>
                <div className="text-xs leading-tight">
                  <p className="text-gray-500">Bem-vindo :)</p>
                  <p className="font-bold text-sm">Entrar ou Cadastrar</p>
                </div>
              </Link>

              <Link href="/favoritos" className="relative text-gray-400 hover:text-colorado-red transition-colors p-2 hover:bg-red-50 rounded-full group">
                <Heart className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </Link>

              <button 
                onClick={openCart}
                className="relative flex items-center gap-3 bg-colorado-red text-white px-5 py-2.5 rounded-xl hover:bg-colorado-red-dark transition-all shadow-lg shadow-red-100 hover:shadow-xl hover:translate-y-[-1px] group"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="font-bold text-sm">Carrinho</span>
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-[10px] font-extrabold w-5 h-5 flex items-center justify-center rounded-full shadow-sm border-2 border-white transform group-hover:scale-110 transition-transform">
                  {cartItemsCount}
                </span>
              </button>
            </div>
          </div>

          {/* Desktop Categories Bar - Simplified */}
          <div className="hidden md:flex items-center gap-6 py-2">
            
            {/* Departments Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDepartmentsOpen(!isDepartmentsOpen)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all
                  ${isDepartmentsOpen 
                    ? 'bg-colorado-red text-white shadow-lg shadow-red-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'}
                `}
              >
                <Menu className="w-4 h-4" />
                Todos os Departamentos
                <ChevronDown className={`w-4 h-4 transition-transform ${isDepartmentsOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDepartmentsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 animate-slide-up z-50">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/categoria/${category.slug}`}
                      className="flex items-center justify-between px-4 py-3 hover:bg-red-50 hover:text-colorado-red transition-colors group"
                      onClick={() => setIsDepartmentsOpen(false)}
                    >
                      <span className="text-sm font-medium text-gray-700 group-hover:text-colorado-red">
                        {category.name}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-colorado-red" />
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 my-2"></div>
                  <Link 
                    href="/produtos"
                    className="flex items-center justify-between px-4 py-3 hover:bg-red-50 hover:text-colorado-red transition-colors font-bold text-sm text-gray-900"
                    onClick={() => setIsDepartmentsOpen(false)}
                  >
                    Ver Tudo
                  </Link>
                </div>
              )}
            </div>

            {/* Offers Only */}
            <Link 
              href="/ofertas" 
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-colorado-red hover:bg-red-50 rounded-lg transition-colors ml-auto"
            >
              <Flame className="w-4 h-4 fill-current" />
              Ofertas do Dia
            </Link>
          </div>
        </div>
      </header>

      <CartDrawer />
    </>
  )
}
