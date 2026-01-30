'use client'

import { useState } from 'react'
import {
  Search,
  Bell,
  Menu,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Moon,
  Sun,
} from 'lucide-react'

export function AdminHeader() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const notifications = [
    { id: 1, title: 'Novo pedido #COL-2026-0004', time: '5 min', unread: true },
    { id: 2, title: 'Pagamento confirmado', time: '15 min', unread: true },
    { id: 3, title: 'Estoque baixo: TV 55"', time: '1h', unread: false },
    { id: 4, title: 'Nova avaliação recebida', time: '2h', unread: false },
  ]

  return (
    <header className="h-16 bg-admin-sidebar border-b border-admin-border px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <button className="lg:hidden text-admin-text p-2 hover:bg-admin-bg rounded-lg">
          <Menu className="w-6 h-6" />
        </button>

        {/* Search */}
        <div className="hidden md:flex items-center bg-admin-bg rounded-xl px-4 py-2 w-80">
          <Search className="w-5 h-5 text-admin-muted" />
          <input
            type="text"
            placeholder="Buscar pedidos, produtos, clientes..."
            className="bg-transparent border-none outline-none text-admin-text placeholder:text-admin-muted ml-3 w-full"
          />
          <kbd className="text-xs text-admin-muted bg-admin-sidebar px-2 py-1 rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button className="w-10 h-10 rounded-xl bg-admin-bg flex items-center justify-center text-admin-muted hover:text-admin-text transition-colors">
          <Moon className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-xl bg-admin-bg flex items-center justify-center text-admin-muted hover:text-admin-text transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-colorado-red rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-admin-card border border-admin-border rounded-xl shadow-2xl overflow-hidden animate-fade-in-down">
              <div className="p-4 border-b border-admin-border flex items-center justify-between">
                <h3 className="text-admin-text font-semibold">Notificações</h3>
                <span className="text-xs text-colorado-red">2 novas</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 border-b border-admin-border hover:bg-admin-bg/50 cursor-pointer ${
                      notif.unread ? 'bg-colorado-red/5' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {notif.unread && (
                        <span className="w-2 h-2 bg-colorado-red rounded-full mt-2" />
                      )}
                      <div className={notif.unread ? '' : 'ml-5'}>
                        <p className="text-admin-text text-sm">{notif.title}</p>
                        <p className="text-admin-muted text-xs mt-1">
                          {notif.time} atrás
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center">
                <button className="text-colorado-red text-sm font-medium hover:underline">
                  Ver todas as notificações
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-admin-bg transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-colorado-red to-colorado-yellow flex items-center justify-center">
              <span className="text-white font-semibold text-sm">AD</span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-admin-text text-sm font-medium">Admin</p>
              <p className="text-admin-muted text-xs">Administrador</p>
            </div>
            <ChevronDown className="w-4 h-4 text-admin-muted hidden md:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-14 w-56 bg-admin-card border border-admin-border rounded-xl shadow-2xl overflow-hidden animate-fade-in-down">
              <div className="p-4 border-b border-admin-border">
                <p className="text-admin-text font-semibold">Admin Colorado</p>
                <p className="text-admin-muted text-sm">admin@colorado.com.br</p>
              </div>
              <div className="p-2">
                <button className="w-full flex items-center gap-3 px-3 py-2 text-admin-muted hover:text-admin-text hover:bg-admin-bg rounded-lg transition-colors">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Meu Perfil</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-admin-muted hover:text-admin-text hover:bg-admin-bg rounded-lg transition-colors">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm">Configurações</span>
                </button>
              </div>
              <div className="p-2 border-t border-admin-border">
                <button className="w-full flex items-center gap-3 px-3 py-2 text-colorado-red hover:bg-colorado-red/10 rounded-lg transition-colors">
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Sair</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
