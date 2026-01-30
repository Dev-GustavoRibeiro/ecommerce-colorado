'use client'

import { useState } from 'react'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Wallet,
  PiggyBank,
  Receipt,
  Download,
  Calendar,
  Filter,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { financialSummary, monthlyRevenue, orders, categoryPerformance } from '@/data/admin'

export default function FinancialPage() {
  const [period, setPeriod] = useState('month')

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const stats = [
    {
      title: 'Receita Bruta',
      value: financialSummary.grossRevenue,
      change: 12.5,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Receita Líquida',
      value: financialSummary.netRevenue,
      change: 8.3,
      icon: Wallet,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Lucro',
      value: financialSummary.profit,
      change: 15.2,
      icon: PiggyBank,
      color: 'from-colorado-green to-green-600',
      bgColor: 'bg-colorado-green/10',
    },
    {
      title: 'Margem de Lucro',
      value: financialSummary.profitMargin,
      change: 2.1,
      icon: TrendingUp,
      color: 'from-colorado-yellow to-orange-500',
      bgColor: 'bg-colorado-yellow/10',
      isPercentage: true,
    },
  ]

  const expenses = [
    { name: 'Reembolsos', value: financialSummary.refunds, color: 'bg-red-500' },
    { name: 'Taxas de Pagamento', value: financialSummary.fees, color: 'bg-yellow-500' },
    { name: 'Impostos', value: financialSummary.taxes, color: 'bg-purple-500' },
  ]

  const recentTransactions = orders
    .filter((o) => o.paymentStatus === 'paid')
    .slice(0, 5)
    .map((o) => ({
      id: o.id,
      type: 'income' as const,
      description: `Pedido ${o.orderNumber}`,
      customer: o.customer.name,
      amount: o.total,
      date: o.createdAt,
      method: o.paymentMethod,
    }))

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-admin-text">Financeiro</h1>
          <p className="text-admin-muted">
            Acompanhe as finanças da sua loja
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-admin-card border border-admin-border rounded-xl p-1">
            <button
              onClick={() => setPeriod('week')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                period === 'week'
                  ? 'bg-colorado-red text-white'
                  : 'text-admin-muted hover:text-admin-text'
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setPeriod('month')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                period === 'month'
                  ? 'bg-colorado-red text-white'
                  : 'text-admin-muted hover:text-admin-text'
              }`}
            >
              Mês
            </button>
            <button
              onClick={() => setPeriod('year')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                period === 'year'
                  ? 'bg-colorado-red text-white'
                  : 'text-admin-muted hover:text-admin-text'
              }`}
            >
              Ano
            </button>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Download className="w-5 h-5" />
            Exportar
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
                  {stat.isPercentage
                    ? `${stat.value}%`
                    : formatCurrency(stat.value)}
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
              <span className="text-admin-muted text-sm">vs. período anterior</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="admin-card p-4 flex items-center justify-between">
          <div>
            <p className="text-admin-muted text-sm">Recebido Hoje</p>
            <p className="text-xl font-bold text-colorado-green">
              {formatCurrency(financialSummary.receivedToday)}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
        </div>
        <div className="admin-card p-4 flex items-center justify-between">
          <div>
            <p className="text-admin-muted text-sm">Pagamentos Pendentes</p>
            <p className="text-xl font-bold text-colorado-yellow">
              {formatCurrency(financialSummary.pendingPayments)}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-yellow-500" />
          </div>
        </div>
        <div className="admin-card p-4 flex items-center justify-between">
          <div>
            <p className="text-admin-muted text-sm">Total em Reembolsos</p>
            <p className="text-xl font-bold text-colorado-red">
              {formatCurrency(financialSummary.refunds)}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-red-500" />
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 admin-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-admin-text">
              Receita Mensal - 2026
            </h2>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {monthlyRevenue.map((month, index) => {
              const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.revenue))
              const heightPercent = (month.revenue / maxRevenue) * 100
              return (
                <div
                  key={month.month}
                  className="flex-1 flex flex-col items-center gap-2 group"
                >
                  <div className="relative w-full h-52 flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-colorado-red to-colorado-red-light rounded-t transition-all duration-500 group-hover:from-colorado-yellow group-hover:to-colorado-yellow-light"
                      style={{ height: `${heightPercent}%` }}
                    />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-admin-bg px-2 py-1 rounded text-xs text-admin-text opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {formatCurrency(month.revenue)}
                    </div>
                  </div>
                  <span className="text-admin-muted text-xs">{month.month}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Expenses Breakdown */}
        <div className="admin-card p-6">
          <h2 className="text-lg font-semibold text-admin-text mb-6">
            Despesas
          </h2>
          <div className="space-y-4">
            {expenses.map((expense) => {
              const total = expenses.reduce((acc, e) => acc + e.value, 0)
              const percentage = Math.round((expense.value / total) * 100)
              return (
                <div key={expense.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-admin-text">{expense.name}</span>
                    <span className="text-admin-muted">
                      {formatCurrency(expense.value)}
                    </span>
                  </div>
                  <div className="h-2 bg-admin-bg rounded-full overflow-hidden">
                    <div
                      className={`h-full ${expense.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-admin-border">
            <div className="flex items-center justify-between">
              <span className="text-admin-text font-semibold">Total</span>
              <span className="text-admin-text font-bold">
                {formatCurrency(expenses.reduce((acc, e) => acc + e.value, 0))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Revenue & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Revenue */}
        <div className="admin-card p-6">
          <h2 className="text-lg font-semibold text-admin-text mb-6">
            Receita por Categoria
          </h2>
          <div className="space-y-4">
            {categoryPerformance.map((cat, index) => {
              const colors = [
                'from-colorado-red to-red-400',
                'from-blue-500 to-blue-400',
                'from-colorado-green to-green-400',
                'from-purple-500 to-purple-400',
                'from-colorado-yellow to-yellow-400',
                'from-pink-500 to-pink-400',
              ]
              return (
                <div key={cat.category} className="flex items-center gap-4">
                  <div
                    className={`w-3 h-3 rounded-full bg-gradient-to-r ${
                      colors[index % colors.length]
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-admin-text text-sm">
                        {cat.category}
                      </span>
                      <span className="text-admin-muted text-sm">
                        {formatCurrency(cat.revenue)}
                      </span>
                    </div>
                    <div className="h-2 bg-admin-bg rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${
                          colors[index % colors.length]
                        } rounded-full`}
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-admin-muted text-sm w-12 text-right">
                    {cat.percentage}%
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="admin-card overflow-hidden">
          <div className="p-6 border-b border-admin-border flex items-center justify-between">
            <h2 className="text-lg font-semibold text-admin-text">
              Transações Recentes
            </h2>
            <button className="text-colorado-red text-sm hover:underline">
              Ver todas
            </button>
          </div>
          <div className="divide-y divide-admin-border">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="p-4 hover:bg-admin-bg/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        transaction.type === 'income'
                          ? 'bg-green-500/10'
                          : 'bg-red-500/10'
                      }`}
                    >
                      {transaction.type === 'income' ? (
                        <ArrowUpRight className="w-5 h-5 text-green-500" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-admin-text font-medium">
                        {transaction.description}
                      </p>
                      <p className="text-admin-muted text-sm">
                        {transaction.customer} • {transaction.method}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold ${
                        transaction.type === 'income'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-admin-muted text-xs">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods Summary */}
      <div className="admin-card p-6">
        <h2 className="text-lg font-semibold text-admin-text mb-6">
          Métodos de Pagamento
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-2xl flex items-center justify-center mb-3">
              <CreditCard className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-admin-text">45%</p>
            <p className="text-admin-muted text-sm">Cartão de Crédito</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-2xl flex items-center justify-center mb-3">
              <Wallet className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-admin-text">35%</p>
            <p className="text-admin-muted text-sm">Pix</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-3">
              <Receipt className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-admin-text">15%</p>
            <p className="text-admin-muted text-sm">Boleto</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-purple-500/10 rounded-2xl flex items-center justify-center mb-3">
              <CreditCard className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-admin-text">5%</p>
            <p className="text-admin-muted text-sm">Cartão de Débito</p>
          </div>
        </div>
      </div>
    </div>
  )
}
