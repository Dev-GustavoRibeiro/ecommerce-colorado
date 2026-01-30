'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Search,
  Filter,
  Download,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  X,
} from 'lucide-react'
import { orders } from '@/data/admin'

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'status-pending'
      case 'processing':
        return 'status-processing'
      case 'shipped':
        return 'status-shipped'
      case 'delivered':
        return 'status-delivered'
      case 'cancelled':
        return 'status-cancelled'
      default:
        return ''
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente'
      case 'processing':
        return 'Processando'
      case 'shipped':
        return 'Enviado'
      case 'delivered':
        return 'Entregue'
      case 'cancelled':
        return 'Cancelado'
      default:
        return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return Clock
      case 'processing':
        return Package
      case 'shipped':
        return Truck
      case 'delivered':
        return CheckCircle
      case 'cancelled':
        return XCircle
      default:
        return Clock
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-admin-text">Pedidos</h1>
          <p className="text-admin-muted">
            Gerencie todos os pedidos da sua loja
          </p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Download className="w-5 h-5" />
          Exportar
        </button>
      </div>

      {/* Filters */}
      <div className="admin-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-admin-muted" />
            <input
              type="text"
              placeholder="Buscar por número do pedido ou cliente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text placeholder:text-admin-muted focus:border-colorado-red focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-admin-muted" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text focus:border-colorado-red focus:outline-none"
            >
              <option value="all">Todos os status</option>
              <option value="pending">Pendentes</option>
              <option value="processing">Processando</option>
              <option value="shipped">Enviados</option>
              <option value="delivered">Entregues</option>
              <option value="cancelled">Cancelados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Produtos</th>
                <th>Total</th>
                <th>Pagamento</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const StatusIcon = getStatusIcon(order.status)
                return (
                  <tr key={order.id}>
                    <td>
                      <span className="font-semibold text-colorado-red">
                        {order.orderNumber}
                      </span>
                    </td>
                    <td>
                      <div>
                        <p className="font-medium">{order.customer.name}</p>
                        <p className="text-admin-muted text-sm">
                          {order.customer.email}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {order.items.slice(0, 3).map((item, i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-lg overflow-hidden border-2 border-admin-card bg-white"
                            >
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={32}
                                height={32}
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        <span className="text-sm text-admin-muted">
                          {order.items.length} item(s)
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="font-semibold">
                        {formatCurrency(order.total)}
                      </span>
                    </td>
                    <td>
                      <div>
                        <p className="text-sm">{order.paymentMethod}</p>
                        <p
                          className={`text-xs ${
                            order.paymentStatus === 'paid'
                              ? 'text-green-500'
                              : order.paymentStatus === 'pending'
                              ? 'text-yellow-500'
                              : 'text-red-500'
                          }`}
                        >
                          {order.paymentStatus === 'paid'
                            ? 'Pago'
                            : order.paymentStatus === 'pending'
                            ? 'Pendente'
                            : 'Reembolsado'}
                        </p>
                      </div>
                    </td>
                    <td>
                      <span className={getStatusColor(order.status)}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td>
                      <span className="text-sm">{formatDate(order.createdAt)}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 hover:bg-admin-bg rounded-lg transition-colors text-admin-muted hover:text-colorado-red"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-admin-bg rounded-lg transition-colors text-admin-muted hover:text-admin-text">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-admin-border flex items-center justify-between">
          <p className="text-admin-muted text-sm">
            Mostrando {filteredOrders.length} de {orders.length} pedidos
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-admin-bg rounded-lg transition-colors text-admin-muted">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 bg-colorado-red text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 hover:bg-admin-bg rounded-lg text-admin-muted">
              2
            </button>
            <button className="p-2 hover:bg-admin-bg rounded-lg transition-colors text-admin-muted">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-admin-card border border-admin-border rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-scale-in">
            {/* Modal Header */}
            <div className="p-6 border-b border-admin-border flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-admin-text">
                  Pedido {selectedOrder.orderNumber}
                </h2>
                <p className="text-admin-muted text-sm">
                  {formatDate(selectedOrder.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-admin-bg rounded-lg transition-colors text-admin-muted"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {/* Status Timeline */}
              <div className="mb-8">
                <h3 className="text-admin-text font-semibold mb-4">
                  Status do Pedido
                </h3>
                <div className="flex items-center justify-between">
                  {['pending', 'processing', 'shipped', 'delivered'].map(
                    (status, index) => {
                      const StatusIcon = getStatusIcon(status)
                      const isActive =
                        ['pending', 'processing', 'shipped', 'delivered'].indexOf(
                          selectedOrder.status
                        ) >= index
                      const isCurrent = selectedOrder.status === status
                      return (
                        <div key={status} className="flex items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              isActive
                                ? 'bg-colorado-green text-white'
                                : 'bg-admin-bg text-admin-muted'
                            } ${isCurrent ? 'ring-4 ring-colorado-green/30' : ''}`}
                          >
                            <StatusIcon className="w-5 h-5" />
                          </div>
                          {index < 3 && (
                            <div
                              className={`w-16 md:w-24 h-1 ${
                                isActive ? 'bg-colorado-green' : 'bg-admin-bg'
                              }`}
                            />
                          )}
                        </div>
                      )
                    }
                  )}
                </div>
                <div className="flex justify-between mt-2 text-xs text-admin-muted">
                  <span>Pendente</span>
                  <span>Processando</span>
                  <span>Enviado</span>
                  <span>Entregue</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Info */}
                <div className="bg-admin-bg rounded-xl p-4">
                  <h3 className="text-admin-text font-semibold mb-4">Cliente</h3>
                  <div className="space-y-3">
                    <p className="text-admin-text font-medium">
                      {selectedOrder.customer.name}
                    </p>
                    <div className="flex items-center gap-2 text-admin-muted text-sm">
                      <Mail className="w-4 h-4" />
                      {selectedOrder.customer.email}
                    </div>
                    <div className="flex items-center gap-2 text-admin-muted text-sm">
                      <Phone className="w-4 h-4" />
                      {selectedOrder.customer.phone}
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-admin-bg rounded-xl p-4">
                  <h3 className="text-admin-text font-semibold mb-4">
                    Endereço de Entrega
                  </h3>
                  <div className="flex items-start gap-2 text-admin-muted text-sm">
                    <MapPin className="w-4 h-4 mt-0.5" />
                    <div>
                      <p>
                        {selectedOrder.shippingAddress.street},{' '}
                        {selectedOrder.shippingAddress.number}
                      </p>
                      {selectedOrder.shippingAddress.complement && (
                        <p>{selectedOrder.shippingAddress.complement}</p>
                      )}
                      <p>
                        {selectedOrder.shippingAddress.neighborhood} -{' '}
                        {selectedOrder.shippingAddress.city}/
                        {selectedOrder.shippingAddress.state}
                      </p>
                      <p>CEP: {selectedOrder.shippingAddress.zipCode}</p>
                    </div>
                  </div>
                  {selectedOrder.trackingCode && (
                    <div className="mt-4 p-2 bg-admin-card rounded-lg">
                      <p className="text-xs text-admin-muted">Código de Rastreio</p>
                      <p className="text-colorado-red font-mono font-semibold">
                        {selectedOrder.trackingCode}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="mt-6">
                <h3 className="text-admin-text font-semibold mb-4">
                  Itens do Pedido
                </h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 bg-admin-bg rounded-xl p-3"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-white">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-admin-text font-medium">{item.name}</p>
                        <p className="text-admin-muted text-sm">
                          Qtd: {item.quantity}
                        </p>
                      </div>
                      <p className="text-admin-text font-semibold">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="mt-6 bg-admin-bg rounded-xl p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-admin-muted">
                    <span>Subtotal</span>
                    <span>{formatCurrency(selectedOrder.total)}</span>
                  </div>
                  <div className="flex justify-between text-admin-muted">
                    <span>Frete</span>
                    <span className="text-colorado-green">Grátis</span>
                  </div>
                  <div className="flex justify-between text-admin-text font-bold text-lg pt-2 border-t border-admin-border">
                    <span>Total</span>
                    <span>{formatCurrency(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-admin-border flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className={getStatusColor(selectedOrder.status)}>
                  {getStatusLabel(selectedOrder.status)}
                </span>
                <span
                  className={`text-sm ${
                    selectedOrder.paymentStatus === 'paid'
                      ? 'text-green-500'
                      : 'text-yellow-500'
                  }`}
                >
                  {selectedOrder.paymentStatus === 'paid'
                    ? '✓ Pago'
                    : '⏳ Aguardando'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-admin-bg text-admin-text rounded-xl hover:bg-admin-border transition-colors">
                  Imprimir
                </button>
                <button className="btn-primary">Atualizar Status</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
