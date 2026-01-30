import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Truck,
  Clock,
  CheckCircle,
  AlertCircle,
  ShoppingCart,
  UserPlus,
  CreditCard,
  Star,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {
  dashboardStats,
  salesData,
  topProducts,
  recentActivities,
  orders,
  categoryPerformance,
} from '@/data/admin'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingBag,
  UserPlus,
  Truck,
  CreditCard,
  Star,
}

export default function AdminDashboard() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value)
  }

  const stats = [
    {
      title: 'Receita Total',
      value: formatCurrency(dashboardStats.totalRevenue),
      change: dashboardStats.revenueGrowth,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Total de Pedidos',
      value: formatNumber(dashboardStats.totalOrders),
      change: dashboardStats.ordersGrowth,
      icon: ShoppingBag,
      color: 'from-colorado-red to-red-600',
      bgColor: 'bg-colorado-red/10',
    },
    {
      title: 'Total de Clientes',
      value: formatNumber(dashboardStats.totalCustomers),
      change: dashboardStats.customersGrowth,
      icon: Users,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Ticket Médio',
      value: formatCurrency(dashboardStats.averageTicket),
      change: dashboardStats.ticketGrowth,
      icon: TrendingUp,
      color: 'from-colorado-yellow to-orange-500',
      bgColor: 'bg-colorado-yellow/10',
    },
  ]

  const orderStatusCards = [
    {
      title: 'Pendentes',
      value: dashboardStats.pendingOrders,
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      title: 'Processando',
      value: dashboardStats.processingOrders,
      icon: Package,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Em Trânsito',
      value: dashboardStats.shippedOrders,
      icon: Truck,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Entregues',
      value: dashboardStats.deliveredOrders,
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
  ]

  const recentOrders = orders.slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-admin-text">Dashboard</h1>
          <p className="text-admin-muted">
            Bem-vindo de volta! Aqui está o resumo da sua loja.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-admin-card border border-admin-border rounded-xl px-4 py-2 text-admin-text text-sm focus:border-colorado-red focus:outline-none">
            <option>Últimos 7 dias</option>
            <option>Últimos 30 dias</option>
            <option>Este mês</option>
            <option>Este ano</option>
          </select>
          <button className="btn-primary text-sm">
            Exportar Relatório
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.title}
            className="admin-stat-card p-6 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-admin-muted text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-admin-text mt-2">
                  {stat.value}
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              {stat.change >= 0 ? (
                <span className="flex items-center text-green-500 text-sm">
                  <ArrowUpRight className="w-4 h-4" />
                  +{stat.change}%
                </span>
              ) : (
                <span className="flex items-center text-red-500 text-sm">
                  <ArrowDownRight className="w-4 h-4" />
                  {stat.change}%
                </span>
              )}
              <span className="text-admin-muted text-sm">vs. mês anterior</span>
            </div>
          </div>
        ))}
      </div>

      {/* Order Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {orderStatusCards.map((card) => (
          <div
            key={card.title}
            className="admin-card p-4 flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center`}
            >
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-admin-text">{card.value}</p>
              <p className="text-admin-muted text-sm">{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 admin-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-admin-text">
              Vendas da Semana
            </h2>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-colorado-red" />
                <span className="text-admin-muted">Receita</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-colorado-yellow" />
                <span className="text-admin-muted">Pedidos</span>
              </span>
            </div>
          </div>

          {/* Simple Chart Visualization */}
          <div className="h-64 flex items-end justify-between gap-4">
            {salesData.map((day, index) => {
              const maxRevenue = Math.max(...salesData.map((d) => d.revenue))
              const heightPercent = (day.revenue / maxRevenue) * 100
              return (
                <div
                  key={day.date}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div className="w-full flex flex-col items-center gap-1 h-52">
                    <div
                      className="w-full bg-gradient-to-t from-colorado-red to-colorado-red-light rounded-t-lg transition-all duration-500 hover:opacity-80"
                      style={{
                        height: `${heightPercent}%`,
                        animationDelay: `${index * 100}ms`,
                      }}
                    />
                  </div>
                  <span className="text-admin-muted text-xs">{day.date}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Category Performance */}
        <div className="admin-card p-6">
          <h2 className="text-lg font-semibold text-admin-text mb-6">
            Vendas por Categoria
          </h2>
          <div className="space-y-4">
            {categoryPerformance.slice(0, 5).map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-admin-text text-sm truncate pr-2">
                    {cat.category}
                  </span>
                  <span className="text-admin-muted text-sm">
                    {cat.percentage}%
                  </span>
                </div>
                <div className="h-2 bg-admin-bg rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-colorado-red to-colorado-yellow rounded-full transition-all duration-1000"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="admin-card overflow-hidden">
          <div className="p-6 border-b border-admin-border flex items-center justify-between">
            <h2 className="text-lg font-semibold text-admin-text">
              Pedidos Recentes
            </h2>
            <Link
              href="/admin/pedidos"
              className="text-colorado-red text-sm hover:underline"
            >
              Ver todos
            </Link>
          </div>
          <div className="divide-y divide-admin-border">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 hover:bg-admin-bg/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-colorado-red/20 to-colorado-yellow/20 flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-colorado-red" />
                    </div>
                    <div>
                      <p className="text-admin-text font-medium">
                        {order.orderNumber}
                      </p>
                      <p className="text-admin-muted text-sm">
                        {order.customer.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-admin-text font-semibold">
                      {formatCurrency(order.total)}
                    </p>
                    <span className={`status-${order.status}`}>
                      {order.status === 'pending' && 'Pendente'}
                      {order.status === 'processing' && 'Processando'}
                      {order.status === 'shipped' && 'Enviado'}
                      {order.status === 'delivered' && 'Entregue'}
                      {order.status === 'cancelled' && 'Cancelado'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="admin-card overflow-hidden">
          <div className="p-6 border-b border-admin-border flex items-center justify-between">
            <h2 className="text-lg font-semibold text-admin-text">
              Produtos Mais Vendidos
            </h2>
            <Link
              href="/admin/produtos"
              className="text-colorado-red text-sm hover:underline"
            >
              Ver todos
            </Link>
          </div>
          <div className="divide-y divide-admin-border">
            {topProducts.map((product, index) => (
              <div
                key={product.id}
                className="p-4 hover:bg-admin-bg/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-admin-muted font-bold text-lg w-6">
                    #{index + 1}
                  </span>
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-admin-text font-medium truncate">
                      {product.name}
                    </p>
                    <p className="text-admin-muted text-sm">
                      {product.sales} vendas
                    </p>
                  </div>
                  <p className="text-colorado-green font-semibold">
                    {formatCurrency(product.revenue)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="admin-card p-6">
        <h2 className="text-lg font-semibold text-admin-text mb-6">
          Atividade Recente
        </h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => {
            const Icon = iconMap[activity.icon] || ShoppingBag
            return (
              <div
                key={activity.id}
                className="flex items-center gap-4 animate-slide-in-left"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    activity.type === 'order'
                      ? 'bg-colorado-red/10 text-colorado-red'
                      : activity.type === 'customer'
                      ? 'bg-blue-500/10 text-blue-500'
                      : activity.type === 'shipping'
                      ? 'bg-purple-500/10 text-purple-500'
                      : activity.type === 'payment'
                      ? 'bg-green-500/10 text-green-500'
                      : 'bg-yellow-500/10 text-yellow-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-admin-text">{activity.message}</p>
                  <p className="text-admin-muted text-sm">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
