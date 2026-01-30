'use client'

import { useState } from 'react'
import {
  Search,
  Filter,
  Download,
  Eye,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  X,
  UserCircle,
  Calendar,
  DollarSign,
} from 'lucide-react'
import { customers } from '@/data/admin'

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null)

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
    })
  }

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => c.status === 'active').length
  const totalRevenue = customers.reduce((acc, c) => acc + c.totalSpent, 0)
  const avgTicket = totalRevenue / customers.reduce((acc, c) => acc + c.totalOrders, 0) || 0

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-admin-text">Clientes</h1>
          <p className="text-admin-muted">
            Gerencie os clientes da sua loja
          </p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Download className="w-5 h-5" />
          Exportar
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="admin-card p-4">
          <p className="text-admin-muted text-sm">Total de Clientes</p>
          <p className="text-2xl font-bold text-admin-text">{totalCustomers}</p>
        </div>
        <div className="admin-card p-4">
          <p className="text-admin-muted text-sm">Clientes Ativos</p>
          <p className="text-2xl font-bold text-colorado-green">{activeCustomers}</p>
        </div>
        <div className="admin-card p-4">
          <p className="text-admin-muted text-sm">Receita Total</p>
          <p className="text-2xl font-bold text-colorado-yellow">
            {formatCurrency(totalRevenue)}
          </p>
        </div>
        <div className="admin-card p-4">
          <p className="text-admin-muted text-sm">Ticket Médio</p>
          <p className="text-2xl font-bold text-admin-text">
            {formatCurrency(avgTicket)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-admin-muted" />
            <input
              type="text"
              placeholder="Buscar por nome ou e-mail..."
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
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Contato</th>
                <th>Pedidos</th>
                <th>Total Gasto</th>
                <th>Último Pedido</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-colorado-red to-colorado-yellow flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {customer.name
                            .split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-admin-text">
                          {customer.name}
                        </p>
                        <p className="text-admin-muted text-sm">{customer.cpf}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="space-y-1">
                      <p className="text-sm flex items-center gap-1">
                        <Mail className="w-3 h-3 text-admin-muted" />
                        {customer.email}
                      </p>
                      <p className="text-sm flex items-center gap-1">
                        <Phone className="w-3 h-3 text-admin-muted" />
                        {customer.phone}
                      </p>
                    </div>
                  </td>
                  <td>
                    <span className="font-semibold">{customer.totalOrders}</span>
                  </td>
                  <td>
                    <span className="font-semibold text-colorado-green">
                      {formatCurrency(customer.totalSpent)}
                    </span>
                  </td>
                  <td>
                    <span className="text-sm">
                      {formatDate(customer.lastOrderDate)}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        customer.status === 'active'
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-gray-500/20 text-gray-500'
                      }`}
                    >
                      {customer.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="p-2 hover:bg-admin-bg rounded-lg transition-colors text-admin-muted hover:text-colorado-red"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-admin-border flex items-center justify-between">
          <p className="text-admin-muted text-sm">
            Mostrando {filteredCustomers.length} de {customers.length} clientes
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-admin-bg rounded-lg transition-colors text-admin-muted">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 bg-colorado-red text-white rounded-lg">
              1
            </button>
            <button className="p-2 hover:bg-admin-bg rounded-lg transition-colors text-admin-muted">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-admin-card border border-admin-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-scale-in">
            {/* Modal Header */}
            <div className="p-6 border-b border-admin-border flex items-center justify-between">
              <h2 className="text-xl font-bold text-admin-text">
                Detalhes do Cliente
              </h2>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-2 hover:bg-admin-bg rounded-lg transition-colors text-admin-muted"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Customer Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-colorado-red to-colorado-yellow flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">
                    {selectedCustomer.name
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-admin-text">
                    {selectedCustomer.name}
                  </h3>
                  <p className="text-admin-muted">{selectedCustomer.cpf}</p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedCustomer.status === 'active'
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-gray-500/20 text-gray-500'
                    }`}
                  >
                    {selectedCustomer.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-admin-bg rounded-xl p-4 text-center">
                  <ShoppingBag className="w-6 h-6 mx-auto text-colorado-red mb-2" />
                  <p className="text-2xl font-bold text-admin-text">
                    {selectedCustomer.totalOrders}
                  </p>
                  <p className="text-admin-muted text-sm">Pedidos</p>
                </div>
                <div className="bg-admin-bg rounded-xl p-4 text-center">
                  <DollarSign className="w-6 h-6 mx-auto text-colorado-green mb-2" />
                  <p className="text-2xl font-bold text-admin-text">
                    {formatCurrency(selectedCustomer.totalSpent)}
                  </p>
                  <p className="text-admin-muted text-sm">Total Gasto</p>
                </div>
                <div className="bg-admin-bg rounded-xl p-4 text-center">
                  <Calendar className="w-6 h-6 mx-auto text-colorado-yellow mb-2" />
                  <p className="text-lg font-bold text-admin-text">
                    {formatDate(selectedCustomer.createdAt)}
                  </p>
                  <p className="text-admin-muted text-sm">Cliente desde</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-admin-bg rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-admin-text mb-4">
                  Informações de Contato
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-admin-muted">
                    <Mail className="w-5 h-5" />
                    <span>{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-admin-muted">
                    <Phone className="w-5 h-5" />
                    <span>{selectedCustomer.phone}</span>
                  </div>
                </div>
              </div>

              {/* Addresses */}
              <div>
                <h4 className="font-semibold text-admin-text mb-4">Endereços</h4>
                <div className="space-y-3">
                  {selectedCustomer.addresses.map((address) => (
                    <div
                      key={address.id}
                      className="bg-admin-bg rounded-xl p-4 flex items-start gap-3"
                    >
                      <MapPin className="w-5 h-5 text-colorado-red mt-0.5" />
                      <div>
                        <p className="font-medium text-admin-text flex items-center gap-2">
                          {address.label}
                          {address.isDefault && (
                            <span className="text-xs bg-colorado-green/20 text-colorado-green px-2 py-0.5 rounded">
                              Padrão
                            </span>
                          )}
                        </p>
                        <p className="text-admin-muted text-sm mt-1">
                          {address.street}, {address.number}
                          {address.complement && ` - ${address.complement}`}
                          <br />
                          {address.neighborhood} - {address.city}/{address.state}
                          <br />
                          CEP: {address.zipCode}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-admin-border flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-6 py-2 bg-admin-bg text-admin-text rounded-xl hover:bg-admin-border transition-colors"
              >
                Fechar
              </button>
              <button className="btn-primary">Ver Pedidos</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
