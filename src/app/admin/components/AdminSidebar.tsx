'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Truck,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Store,
  Tag,
  Bell,
  HelpCircle,
} from 'lucide-react'

const menuItems = [
  {
    title: 'Principal',
    items: [
      { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      { name: 'Pedidos', href: '/admin/pedidos', icon: ShoppingBag, badge: 23 },
      { name: 'Produtos', href: '/admin/produtos', icon: Package },
      { name: 'Clientes', href: '/admin/clientes', icon: Users },
    ],
  },
  {
    title: 'Operações',
    items: [
      { name: 'Envios', href: '/admin/envios', icon: Truck, badge: 45 },
      { name: 'Financeiro', href: '/admin/financeiro', icon: DollarSign },
      { name: 'Relatórios', href: '/admin/relatorios', icon: BarChart3 },
    ],
  },
  {
    title: 'Marketing',
    items: [
      { name: 'Promoções', href: '/admin/promocoes', icon: Tag },
      { name: 'Cupons', href: '/admin/cupons', icon: Tag },
    ],
  },
  {
    title: 'Sistema',
    items: [
      { name: 'Configurações', href: '/admin/configuracoes', icon: Settings },
      { name: 'Ajuda', href: '/admin/ajuda', icon: HelpCircle },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
      {/* Mobile Overlay */}
      <div className="lg:hidden fixed inset-0 bg-black/50 z-40 hidden" />

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-admin-sidebar border-r border-admin-border z-50 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        } hidden lg:block`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-admin-border">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-colorado flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-white font-bold text-lg">COLORADO</h1>
                <p className="text-admin-muted text-xs -mt-1">Admin Panel</p>
              </div>
            )}
          </Link>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-8 h-8 rounded-lg bg-admin-bg flex items-center justify-center text-admin-muted hover:text-white transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-8rem)]">
          {menuItems.map((group) => (
            <div key={group.title}>
              {!isCollapsed && (
                <p className="text-admin-muted text-xs uppercase font-semibold mb-3 px-3">
                  {group.title}
                </p>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`admin-menu-item ${isActive ? 'active' : ''} ${
                          isCollapsed ? 'justify-center px-3' : ''
                        }`}
                        title={isCollapsed ? item.name : undefined}
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {!isCollapsed && (
                          <>
                            <span className="flex-1">{item.name}</span>
                            {item.badge && (
                              <span className="bg-colorado-red text-white text-xs px-2 py-0.5 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-admin-border">
          <Link
            href="/"
            className={`admin-menu-item ${isCollapsed ? 'justify-center px-3' : ''}`}
            title={isCollapsed ? 'Ver Loja' : undefined}
          >
            <Store className="w-5 h-5" />
            {!isCollapsed && <span>Ver Loja</span>}
          </Link>
          <button
            className={`admin-menu-item w-full mt-2 ${
              isCollapsed ? 'justify-center px-3' : ''
            }`}
            title={isCollapsed ? 'Sair' : undefined}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Sair</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
