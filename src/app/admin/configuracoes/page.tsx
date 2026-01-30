'use client'

import { useState } from 'react'
import {
  Store,
  CreditCard,
  Truck,
  Bell,
  Shield,
  Palette,
  Globe,
  Mail,
  Save,
  Upload,
  Image as ImageIcon,
} from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('store')

  const tabs = [
    { id: 'store', name: 'Loja', icon: Store },
    { id: 'payments', name: 'Pagamentos', icon: CreditCard },
    { id: 'shipping', name: 'Frete', icon: Truck },
    { id: 'notifications', name: 'Notificações', icon: Bell },
    { id: 'security', name: 'Segurança', icon: Shield },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-admin-text">Configurações</h1>
        <p className="text-admin-muted">
          Gerencie as configurações da sua loja
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="admin-card p-2">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === tab.id
                      ? 'bg-colorado-red text-white'
                      : 'text-admin-muted hover:bg-admin-bg hover:text-admin-text'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'store' && (
            <div className="space-y-6">
              {/* Store Info */}
              <div className="admin-card p-6">
                <h2 className="text-lg font-semibold text-admin-text mb-6">
                  Informações da Loja
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-admin-text text-sm font-medium mb-2">
                      Nome da Loja
                    </label>
                    <input
                      type="text"
                      defaultValue="Colorado Móveis & Eletros"
                      className="w-full px-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text focus:border-colorado-red focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-admin-text text-sm font-medium mb-2">
                      E-mail de Contato
                    </label>
                    <input
                      type="email"
                      defaultValue="contato@colorado.com.br"
                      className="w-full px-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text focus:border-colorado-red focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-admin-text text-sm font-medium mb-2">
                      Telefone
                    </label>
                    <input
                      type="text"
                      defaultValue="(11) 4002-8922"
                      className="w-full px-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text focus:border-colorado-red focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-admin-text text-sm font-medium mb-2">
                      CNPJ
                    </label>
                    <input
                      type="text"
                      defaultValue="00.000.000/0001-00"
                      className="w-full px-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text focus:border-colorado-red focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-admin-text text-sm font-medium mb-2">
                    Descrição da Loja
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="A maior loja de móveis e eletrodomésticos do Brasil. Encontre sofás, TVs, geladeiras e muito mais."
                    className="w-full px-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text focus:border-colorado-red focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Logo & Branding */}
              <div className="admin-card p-6">
                <h2 className="text-lg font-semibold text-admin-text mb-6">
                  Logo e Marca
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-admin-text text-sm font-medium mb-2">
                      Logo Principal
                    </label>
                    <div className="border-2 border-dashed border-admin-border rounded-xl p-8 text-center hover:border-colorado-red transition-colors cursor-pointer">
                      <div className="w-16 h-16 mx-auto bg-admin-bg rounded-xl flex items-center justify-center mb-4">
                        <ImageIcon className="w-8 h-8 text-admin-muted" />
                      </div>
                      <p className="text-admin-muted text-sm">
                        Clique para fazer upload
                      </p>
                      <p className="text-admin-muted text-xs mt-1">
                        PNG, JPG até 2MB
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-admin-text text-sm font-medium mb-2">
                      Favicon
                    </label>
                    <div className="border-2 border-dashed border-admin-border rounded-xl p-8 text-center hover:border-colorado-red transition-colors cursor-pointer">
                      <div className="w-16 h-16 mx-auto bg-admin-bg rounded-xl flex items-center justify-center mb-4">
                        <Globe className="w-8 h-8 text-admin-muted" />
                      </div>
                      <p className="text-admin-muted text-sm">
                        Clique para fazer upload
                      </p>
                      <p className="text-admin-muted text-xs mt-1">
                        ICO, PNG 32x32
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div className="admin-card p-6">
                <h2 className="text-lg font-semibold text-admin-text mb-6">
                  Cores da Marca
                </h2>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-admin-text text-sm font-medium mb-2">
                      Cor Principal
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-colorado-red" />
                      <input
                        type="text"
                        defaultValue="#C41E3A"
                        className="flex-1 px-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text focus:border-colorado-red focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-admin-text text-sm font-medium mb-2">
                      Cor Secundária
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-colorado-yellow" />
                      <input
                        type="text"
                        defaultValue="#FFD700"
                        className="flex-1 px-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text focus:border-colorado-red focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-admin-text text-sm font-medium mb-2">
                      Cor de Destaque
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-colorado-green" />
                      <input
                        type="text"
                        defaultValue="#228B22"
                        className="flex-1 px-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text focus:border-colorado-red focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="admin-card p-6">
                <h2 className="text-lg font-semibold text-admin-text mb-6">
                  Métodos de Pagamento
                </h2>
                <div className="space-y-4">
                  {[
                    { name: 'Cartão de Crédito', enabled: true },
                    { name: 'Cartão de Débito', enabled: true },
                    { name: 'Pix', enabled: true },
                    { name: 'Boleto Bancário', enabled: true },
                    { name: 'Transferência Bancária', enabled: false },
                  ].map((method) => (
                    <div
                      key={method.name}
                      className="flex items-center justify-between p-4 bg-admin-bg rounded-xl"
                    >
                      <span className="text-admin-text">{method.name}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={method.enabled}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-admin-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-colorado-green" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="admin-card p-6">
                <h2 className="text-lg font-semibold text-admin-text mb-6">
                  Parcelamento
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-admin-text text-sm font-medium mb-2">
                      Máximo de Parcelas
                    </label>
                    <select className="w-full px-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text focus:border-colorado-red focus:outline-none">
                      <option>12x</option>
                      <option>10x</option>
                      <option>6x</option>
                      <option>3x</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-admin-text text-sm font-medium mb-2">
                      Parcelas sem Juros
                    </label>
                    <select className="w-full px-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text focus:border-colorado-red focus:outline-none">
                      <option>12x</option>
                      <option>10x</option>
                      <option>6x</option>
                      <option>3x</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-6">
              <div className="admin-card p-6">
                <h2 className="text-lg font-semibold text-admin-text mb-6">
                  Configurações de Frete
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-admin-text text-sm font-medium mb-2">
                      Valor Mínimo para Frete Grátis
                    </label>
                    <input
                      type="text"
                      defaultValue="R$ 299,00"
                      className="w-full px-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text focus:border-colorado-red focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-admin-text text-sm font-medium mb-2">
                      Prazo de Entrega Padrão
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="number"
                        defaultValue="3"
                        placeholder="Mínimo"
                        className="px-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text focus:border-colorado-red focus:outline-none"
                      />
                      <input
                        type="number"
                        defaultValue="7"
                        placeholder="Máximo"
                        className="px-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text focus:border-colorado-red focus:outline-none"
                      />
                    </div>
                    <p className="text-admin-muted text-xs mt-2">
                      Dias úteis para entrega
                    </p>
                  </div>
                </div>
              </div>

              <div className="admin-card p-6">
                <h2 className="text-lg font-semibold text-admin-text mb-6">
                  Transportadoras
                </h2>
                <div className="space-y-4">
                  {[
                    { name: 'Correios', enabled: true },
                    { name: 'Jadlog', enabled: true },
                    { name: 'Total Express', enabled: false },
                    { name: 'Loggi', enabled: false },
                  ].map((carrier) => (
                    <div
                      key={carrier.name}
                      className="flex items-center justify-between p-4 bg-admin-bg rounded-xl"
                    >
                      <span className="text-admin-text">{carrier.name}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={carrier.enabled}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-admin-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-colorado-green" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="admin-card p-6">
              <h2 className="text-lg font-semibold text-admin-text mb-6">
                Notificações por E-mail
              </h2>
              <div className="space-y-4">
                {[
                  { name: 'Novo pedido recebido', enabled: true },
                  { name: 'Pagamento confirmado', enabled: true },
                  { name: 'Pedido enviado', enabled: true },
                  { name: 'Pedido entregue', enabled: false },
                  { name: 'Novo cadastro de cliente', enabled: true },
                  { name: 'Estoque baixo', enabled: true },
                  { name: 'Nova avaliação', enabled: false },
                ].map((notif) => (
                  <div
                    key={notif.name}
                    className="flex items-center justify-between p-4 bg-admin-bg rounded-xl"
                  >
                    <span className="text-admin-text">{notif.name}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={notif.enabled}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-admin-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-colorado-green" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="admin-card p-6">
                <h2 className="text-lg font-semibold text-admin-text mb-6">
                  Alterar Senha
                </h2>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-admin-text text-sm font-medium mb-2">
                      Senha Atual
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text focus:border-colorado-red focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-admin-text text-sm font-medium mb-2">
                      Nova Senha
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text focus:border-colorado-red focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-admin-text text-sm font-medium mb-2">
                      Confirmar Nova Senha
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text focus:border-colorado-red focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="admin-card p-6">
                <h2 className="text-lg font-semibold text-admin-text mb-6">
                  Autenticação de Dois Fatores
                </h2>
                <div className="flex items-center justify-between p-4 bg-admin-bg rounded-xl">
                  <div>
                    <p className="text-admin-text font-medium">
                      Ativar 2FA
                    </p>
                    <p className="text-admin-muted text-sm">
                      Adicione uma camada extra de segurança
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-admin-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-colorado-green" />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <button className="btn-primary flex items-center gap-2">
              <Save className="w-5 h-5" />
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
