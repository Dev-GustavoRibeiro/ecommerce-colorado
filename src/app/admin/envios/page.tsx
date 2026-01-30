'use client'

import { useState } from 'react'
import {
  Search,
  Filter,
  Download,
  Truck,
  Package,
  CheckCircle,
  Clock,
  AlertTriangle,
  MapPin,
  Copy,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from 'lucide-react'
import { orders, shippingStats } from '@/data/admin'

export default function ShippingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  // Filter orders that have been shipped or are ready to ship
  const shippingOrders = orders.filter(
    (order) =>
      order.status === 'processing' ||
      order.status === 'shipped' ||
      order.status === 'delivered'
  )

  const filteredOrders = shippingOrders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.trackingCode?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-admin-text">Envios</h1>
          <p className="text-admin-muted">
            Gerencie os envios e rastreamento de pedidos
          </p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Download className="w-5 h-5" />
          Exportar Etiquetas
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="admin-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-admin-text">
                {shippingStats.awaitingPickup}
              </p>
              <p className="text-admin-muted text-xs">Aguardando Coleta</p>
            </div>
          </div>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Truck className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-admin-text">
                {shippingStats.inTransit}
              </p>
              <p className="text-admin-muted text-xs">Em Trânsito</p>
            </div>
          </div>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-admin-text">
                {shippingStats.delivered}
              </p>
              <p className="text-admin-muted text-xs">Entregues</p>
            </div>
          </div>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <RotateCcw className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-admin-text">
                {shippingStats.returned}
              </p>
              <p className="text-admin-muted text-xs">Devolvidos</p>
            </div>
          </div>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-admin-text">
                {shippingStats.averageDeliveryDays}
              </p>
              <p className="text-admin-muted text-xs">Dias Médio</p>
            </div>
          </div>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-colorado-green/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-colorado-green" />
            </div>
            <div>
              <p className="text-2xl font-bold text-admin-text">
                {shippingStats.onTimeDeliveryRate}%
              </p>
              <p className="text-admin-muted text-xs">No Prazo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-admin-muted" />
            <input
              type="text"
              placeholder="Buscar por pedido, cliente ou código de rastreio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text placeholder:text-admin-muted focus:border-colorado-red focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-admin-muted" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text focus:border-colorado-red focus:outline-none"
            >
              <option value="all">Todos os status</option>
              <option value="processing">Aguardando envio</option>
              <option value="shipped">Em trânsito</option>
              <option value="delivered">Entregues</option>
            </select>
          </div>
        </div>
      </div>

      {/* Shipping List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="admin-card p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Order Info */}
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    order.status === 'processing'
                      ? 'bg-yellow-500/10'
                      : order.status === 'shipped'
                      ? 'bg-blue-500/10'
                      : 'bg-green-500/10'
                  }`}
                >
                  {order.status === 'processing' ? (
                    <Package className="w-6 h-6 text-yellow-500" />
                  ) : order.status === 'shipped' ? (
                    <Truck className="w-6 h-6 text-blue-500" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-bold text-colorado-red">
                      {order.orderNumber}
                    </p>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'processing'
                          ? 'bg-yellow-500/20 text-yellow-500'
                          : order.status === 'shipped'
                          ? 'bg-blue-500/20 text-blue-500'
                          : 'bg-green-500/20 text-green-500'
                      }`}
                    >
                      {order.status === 'processing'
                        ? 'Aguardando Envio'
                        : order.status === 'shipped'
                        ? 'Em Trânsito'
                        : 'Entregue'}
                    </span>
                  </div>
                  <p className="text-admin-text mt-1">{order.customer.name}</p>
                  <div className="flex items-start gap-1 mt-2 text-admin-muted text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>
                      {order.shippingAddress.street},{' '}
                      {order.shippingAddress.number} -{' '}
                      {order.shippingAddress.city}/{order.shippingAddress.state}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tracking & Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {order.trackingCode ? (
                  <div className="bg-admin-bg rounded-xl p-3">
                    <p className="text-admin-muted text-xs mb-1">
                      Código de Rastreio
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="text-colorado-red font-mono font-semibold">
                        {order.trackingCode}
                      </code>
                      <button
                        onClick={() => copyToClipboard(order.trackingCode!)}
                        className="p-1.5 hover:bg-admin-border rounded transition-colors"
                        title="Copiar código"
                      >
                        <Copy className="w-4 h-4 text-admin-muted" />
                      </button>
                      <a
                        href="#"
                        className="p-1.5 hover:bg-admin-border rounded transition-colors"
                        title="Rastrear"
                      >
                        <ExternalLink className="w-4 h-4 text-admin-muted" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-500/10 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-yellow-500">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Aguardando código
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  {order.status === 'processing' && (
                    <button className="px-4 py-2 bg-colorado-green text-white rounded-xl hover:bg-colorado-green-dark transition-colors text-sm font-medium">
                      Marcar como Enviado
                    </button>
                  )}
                  {order.status === 'shipped' && (
                    <button className="px-4 py-2 bg-colorado-red text-white rounded-xl hover:bg-colorado-red-dark transition-colors text-sm font-medium">
                      Confirmar Entrega
                    </button>
                  )}
                  <button className="px-4 py-2 bg-admin-bg text-admin-text rounded-xl hover:bg-admin-border transition-colors text-sm">
                    Imprimir Etiqueta
                  </button>
                </div>
              </div>
            </div>

            {/* Timeline */}
            {order.status !== 'processing' && (
              <div className="mt-6 pt-6 border-t border-admin-border">
                <div className="flex items-center justify-between max-w-2xl">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs text-admin-muted mt-2">Pedido</p>
                    <p className="text-xs text-admin-text">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex-1 h-1 bg-green-500 mx-2" />
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                      <Package className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs text-admin-muted mt-2">Enviado</p>
                    <p className="text-xs text-admin-text">
                      {formatDate(order.updatedAt)}
                    </p>
                  </div>
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      order.status === 'delivered'
                        ? 'bg-green-500'
                        : 'bg-admin-border'
                    }`}
                  />
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        order.status === 'delivered'
                          ? 'bg-green-500'
                          : 'bg-admin-border'
                      }`}
                    >
                      <Truck
                        className={`w-4 h-4 ${
                          order.status === 'delivered'
                            ? 'text-white'
                            : 'text-admin-muted'
                        }`}
                      />
                    </div>
                    <p className="text-xs text-admin-muted mt-2">Em Trânsito</p>
                  </div>
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      order.status === 'delivered'
                        ? 'bg-green-500'
                        : 'bg-admin-border'
                    }`}
                  />
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        order.status === 'delivered'
                          ? 'bg-green-500'
                          : 'bg-admin-border'
                      }`}
                    >
                      <CheckCircle
                        className={`w-4 h-4 ${
                          order.status === 'delivered'
                            ? 'text-white'
                            : 'text-admin-muted'
                        }`}
                      />
                    </div>
                    <p className="text-xs text-admin-muted mt-2">Entregue</p>
                    {order.status === 'delivered' && (
                      <p className="text-xs text-admin-text">
                        {formatDate(order.updatedAt)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-admin-muted text-sm">
          Mostrando {filteredOrders.length} envios
        </p>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-admin-card rounded-lg transition-colors text-admin-muted">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="px-4 py-2 bg-colorado-red text-white rounded-lg">
            1
          </button>
          <button className="p-2 hover:bg-admin-card rounded-lg transition-colors text-admin-muted">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
