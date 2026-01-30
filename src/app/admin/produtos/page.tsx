'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  Upload,
  Eye,
  X,
  ImageIcon,
  Save,
} from 'lucide-react'
import { products, categories } from '@/data/products'

type Product = typeof products[0]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesCategory =
      categoryFilter === 'all' || product.categoryId === categoryFilter
    return matchesSearch && matchesCategory
  })

  const openEditModal = (product: Product) => {
    setEditingProduct(product)
    setShowModal(true)
  }

  const openCreateModal = () => {
    setEditingProduct(null)
    setShowModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-admin-text">Produtos</h1>
          <p className="text-admin-muted">
            Gerencie o catálogo de produtos da sua loja
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-admin-card border border-admin-border rounded-xl text-admin-text hover:bg-admin-bg transition-colors flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Importar
          </button>
          <button
            onClick={openCreateModal}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Novo Produto
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="admin-card p-4">
          <p className="text-admin-muted text-sm">Total de Produtos</p>
          <p className="text-2xl font-bold text-admin-text">{products.length}</p>
        </div>
        <div className="admin-card p-4">
          <p className="text-admin-muted text-sm">Em Estoque</p>
          <p className="text-2xl font-bold text-colorado-green">
            {products.filter((p) => p.stock > 0).length}
          </p>
        </div>
        <div className="admin-card p-4">
          <p className="text-admin-muted text-sm">Estoque Baixo</p>
          <p className="text-2xl font-bold text-colorado-yellow">
            {products.filter((p) => p.stock > 0 && p.stock < 10).length}
          </p>
        </div>
        <div className="admin-card p-4">
          <p className="text-admin-muted text-sm">Sem Estoque</p>
          <p className="text-2xl font-bold text-colorado-red">
            {products.filter((p) => p.stock === 0).length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-admin-muted" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text placeholder:text-admin-muted focus:border-colorado-red focus:outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-admin-muted" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text focus:border-colorado-red focus:outline-none"
            >
              <option value="all">Todas as categorias</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const category = categories.find((c) => c.id === product.categoryId)
          const discount = product.originalPrice
            ? Math.round(
                ((product.originalPrice - product.price) / product.originalPrice) *
                  100
              )
            : 0

          return (
            <div key={product.id} className="admin-card overflow-hidden group">
              {/* Image */}
              <div className="relative aspect-square bg-white">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {discount > 0 && (
                  <span className="absolute top-3 left-3 bg-colorado-red text-white text-xs font-bold px-2 py-1 rounded">
                    -{discount}%
                  </span>
                )}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Sem Estoque
                    </span>
                  </div>
                )}
                {/* Actions Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => openEditModal(product)}
                    className="p-3 bg-white rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <Edit className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="p-3 bg-white rounded-xl hover:bg-gray-100 transition-colors">
                    <Eye className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="p-3 bg-colorado-red rounded-xl hover:bg-colorado-red-dark transition-colors">
                    <Trash2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-admin-muted text-xs uppercase tracking-wide mb-1">
                  {category?.name}
                </p>
                <h3 className="text-admin-text font-semibold line-clamp-2 min-h-[48px]">
                  {product.name}
                </h3>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    {product.originalPrice && (
                      <p className="text-admin-muted text-sm line-through">
                        {formatCurrency(product.originalPrice)}
                      </p>
                    )}
                    <p className="text-colorado-red font-bold text-lg">
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-admin-muted text-xs">Estoque</p>
                    <p
                      className={`font-bold ${
                        product.stock === 0
                          ? 'text-red-500'
                          : product.stock < 10
                          ? 'text-yellow-500'
                          : 'text-green-500'
                      }`}
                    >
                      {product.stock}
                    </p>
                  </div>
                </div>

                {product.featured && (
                  <span className="inline-block mt-3 bg-colorado-yellow/20 text-colorado-yellow-dark text-xs font-semibold px-2 py-1 rounded">
                    ⭐ Destaque
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-admin-muted text-sm">
          Mostrando {filteredProducts.length} de {products.length} produtos
        </p>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-admin-card rounded-lg transition-colors text-admin-muted">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="px-4 py-2 bg-colorado-red text-white rounded-lg">
            1
          </button>
          <button className="px-4 py-2 hover:bg-admin-card rounded-lg text-admin-muted">
            2
          </button>
          <button className="p-2 hover:bg-admin-card rounded-lg transition-colors text-admin-muted">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-admin-card border border-admin-border rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scale-in">
            {/* Modal Header */}
            <div className="p-6 border-b border-admin-border flex items-center justify-between">
              <h2 className="text-xl font-bold text-admin-text">
                {editingProduct ? 'Editar Produto' : 'Novo Produto'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-admin-bg rounded-lg transition-colors text-admin-muted"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Basic Info */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-admin-text text-sm font-medium mb-2">
                      Nome do Produto
                    </label>
                    <input
                      type="text"
                      defaultValue={editingProduct?.name || ''}
                      placeholder="Ex: Sofá Retrátil 3 Lugares"
                      className="w-full px-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text placeholder:text-admin-muted focus:border-colorado-red focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-admin-text text-sm font-medium mb-2">
                      Descrição
                    </label>
                    <textarea
                      rows={4}
                      defaultValue={editingProduct?.description || ''}
                      placeholder="Descreva o produto..."
                      className="w-full px-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text placeholder:text-admin-muted focus:border-colorado-red focus:outline-none resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-admin-text text-sm font-medium mb-2">
                        Preço
                      </label>
                      <input
                        type="text"
                        defaultValue={editingProduct?.price || ''}
                        placeholder="R$ 0,00"
                        className="w-full px-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text placeholder:text-admin-muted focus:border-colorado-red focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-admin-text text-sm font-medium mb-2">
                        Preço Original
                      </label>
                      <input
                        type="text"
                        defaultValue={editingProduct?.originalPrice || ''}
                        placeholder="R$ 0,00"
                        className="w-full px-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text placeholder:text-admin-muted focus:border-colorado-red focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-admin-text text-sm font-medium mb-2">
                        Categoria
                      </label>
                      <select
                        defaultValue={editingProduct?.categoryId || ''}
                        className="w-full px-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text focus:border-colorado-red focus:outline-none"
                      >
                        <option value="">Selecione...</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-admin-text text-sm font-medium mb-2">
                        Estoque
                      </label>
                      <input
                        type="number"
                        defaultValue={editingProduct?.stock || 0}
                        className="w-full px-4 py-3 bg-admin-bg border border-admin-border rounded-xl text-admin-text focus:border-colorado-red focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={editingProduct?.featured || false}
                        className="w-5 h-5 accent-colorado-red rounded"
                      />
                      <span className="text-admin-text">Produto em destaque</span>
                    </label>
                  </div>
                </div>

                {/* Right Column - Images */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-admin-text text-sm font-medium mb-2">
                      Imagens do Produto
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {editingProduct?.images.map((img, index) => (
                        <div
                          key={index}
                          className="relative aspect-square bg-admin-bg rounded-xl overflow-hidden group"
                        >
                          <Image
                            src={img}
                            alt={`Imagem ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <button className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <X className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      ))}
                      <button className="aspect-square bg-admin-bg border-2 border-dashed border-admin-border rounded-xl flex flex-col items-center justify-center gap-2 hover:border-colorado-red transition-colors">
                        <ImageIcon className="w-8 h-8 text-admin-muted" />
                        <span className="text-admin-muted text-sm">
                          Adicionar
                        </span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-admin-text text-sm font-medium mb-2">
                      Especificações
                    </label>
                    <div className="space-y-3">
                      {editingProduct &&
                        Object.entries(
                          editingProduct.specifications as Record<string, string>
                        ).map(([key, value], index) => (
                          <div key={index} className="flex gap-2">
                            <input
                              type="text"
                              defaultValue={key}
                              placeholder="Nome"
                              className="flex-1 px-3 py-2 bg-admin-bg border border-admin-border rounded-lg text-admin-text text-sm focus:border-colorado-red focus:outline-none"
                            />
                            <input
                              type="text"
                              defaultValue={value}
                              placeholder="Valor"
                              className="flex-1 px-3 py-2 bg-admin-bg border border-admin-border rounded-lg text-admin-text text-sm focus:border-colorado-red focus:outline-none"
                            />
                            <button className="p-2 text-admin-muted hover:text-red-500">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      <button className="w-full py-2 border border-dashed border-admin-border rounded-lg text-admin-muted hover:border-colorado-red hover:text-colorado-red transition-colors text-sm">
                        + Adicionar especificação
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-admin-border flex items-center justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-admin-bg text-admin-text rounded-xl hover:bg-admin-border transition-colors"
              >
                Cancelar
              </button>
              <button className="btn-primary flex items-center gap-2">
                <Save className="w-5 h-5" />
                {editingProduct ? 'Salvar Alterações' : 'Criar Produto'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
