'use client'

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  CreditCard,
  ChevronRight,
  Star,
  Minus,
  Plus,
  Check
} from 'lucide-react'
import { getProductBySlug, products, getCategoryBySlug, categories } from '@/data/products'
import { useCartStore } from '@/store/cart'
import { ProductCard } from '@/components/ProductCard'
import { ProductReviews } from '@/components/ProductReviews'
import { notFound } from 'next/navigation'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params)
  const product = getProductBySlug(slug)
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addItem, openCart } = useCartStore()

  if (!product) {
    notFound()
  }

  const category = categories.find(c => c.id === product.categoryId)
  const relatedProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4)

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const installment = product.price / 12
  const pixPrice = product.price * 0.9 // 10% discount for Pix

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        originalPrice: product.originalPrice ?? undefined,
        image: product.images[0],
      })
    }
    openCart()
  }

  const specs = product.specifications as Record<string, string>

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link href="/" className="text-muted hover:text-colorado-red">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-muted" />
            {category && (
              <>
                <Link 
                  href={`/categoria/${category.slug}`} 
                  className="text-muted hover:text-colorado-red"
                >
                  {category.name}
                </Link>
                <ChevronRight className="w-4 h-4 text-muted" />
              </>
            )}
            <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-sm">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 badge badge-sale text-lg">
                  -{discount}%
                </span>
              )}
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index 
                        ? 'border-colorado-red' 
                        : 'border-gray-200 hover:border-colorado-red/50'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < 4 ? 'fill-colorado-yellow text-colorado-yellow' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <a href="#reviews" className="text-muted hover:text-colorado-red hover:underline transition-colors cursor-pointer">
                  (128 avaliações)
                </a>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <p className="text-muted">
                Código: {product.id.padStart(6, '0')}
              </p>
            </div>

            {/* Prices */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              {product.originalPrice && (
                <p className="text-muted line-through text-lg">
                  De: {formatPrice(product.originalPrice)}
                </p>
              )}
              <p className="text-4xl font-bold text-colorado-red mb-1">
                {formatPrice(product.price)}
              </p>
              <p className="text-muted">
                em até <span className="font-semibold text-colorado-green">12x de {formatPrice(installment)}</span> sem juros
              </p>
              <div className="mt-4 p-4 bg-colorado-green/10 rounded-xl">
                <p className="text-colorado-green font-semibold">
                  💰 À vista no Pix: {formatPrice(pixPrice)}
                </p>
                <p className="text-sm text-colorado-green/80">
                  Economia de {formatPrice(product.price - pixPrice)}
                </p>
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">Quantidade:</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-muted">
                  {product.stock > 0 
                    ? `${product.stock} unidades disponíveis` 
                    : 'Produto indisponível'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={handleAddToCart}
                className="flex-1 btn-primary py-4 text-lg flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-6 h-6" />
                Adicionar ao Carrinho
              </button>
              <button className="w-12 h-12 sm:w-14 sm:h-14 border border-gray-200 rounded-xl flex items-center justify-center hover:border-colorado-red hover:text-colorado-red transition-colors">
                <Heart className="w-6 h-6" />
              </button>
              <button className="w-12 h-12 sm:w-14 sm:h-14 border border-gray-200 rounded-xl flex items-center justify-center hover:border-colorado-red hover:text-colorado-red transition-colors">
                <Share2 className="w-6 h-6" />
              </button>
            </div>

            {/* Benefits */}
            <div className="space-y-4 border-t border-gray-200 pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-colorado-green/10 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-colorado-green" />
                </div>
                <div>
                  <p className="font-semibold">Frete Grátis</p>
                  <p className="text-sm text-muted">Para compras acima de R$ 299</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-colorado-yellow/20 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-colorado-yellow-dark" />
                </div>
                <div>
                  <p className="font-semibold">Garantia de Fábrica</p>
                  <p className="text-sm text-muted">12 meses contra defeitos</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-colorado-red/10 rounded-full flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-colorado-red" />
                </div>
                <div>
                  <p className="font-semibold">Pagamento Seguro</p>
                  <p className="text-sm text-muted">Cartões, Pix e Boleto</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description & Specifications */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Description */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Descrição</h2>
            <p className="text-muted leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Especificações</h2>
            <dl className="divide-y divide-gray-100">
              {Object.entries(specs).map(([key, value]) => (
                <div key={key} className="py-3 flex justify-between">
                  <dt className="text-muted">{key}</dt>
                  <dd className="font-medium text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Reviews Section */}
        <ProductReviews />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">
              Produtos <span className="text-colorado-red">Relacionados</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard
                  key={relProduct.id}
                  id={relProduct.id}
                  name={relProduct.name}
                  slug={relProduct.slug}
                  price={relProduct.price}
                  originalPrice={relProduct.originalPrice ?? undefined}
                  image={relProduct.images[0]}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
