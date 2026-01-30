import Link from 'next/link'
import { ArrowRight, Tag, Truck, ShieldCheck, CreditCard } from 'lucide-react'
import { HeroBanner } from '@/components/HeroBanner'
import { ProductCard } from '@/components/ProductCard'
import { CategoryCard } from '@/components/CategoryCard'
import { products, categories, getFeaturedProducts } from '@/data/products'

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()
  const saleProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 4)

  return (
    <div className="bg-gray-50/50 pb-16">
      <HeroBanner />

      {/* Categories - Clean Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          Departamentos
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              {...category}
              variant="compact"
            />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-4 md:py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Destaques da Semana
            </h2>
            <p className="text-sm text-gray-500 hidden md:block mt-1">
              Seleção especial com os melhores preços para você
            </p>
          </div>
          <Link 
            href="/produtos"
            className="text-sm font-semibold text-colorado-red hover:text-colorado-red-dark flex items-center gap-1"
          >
            Ver todos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              slug={product.slug}
              price={product.price}
              originalPrice={product.originalPrice ?? undefined}
              image={product.images[0]}
              featured={product.featured}
            />
          ))}
        </div>
      </section>

      {/* Benefits Banner - Clean */}
      <section className="bg-white border-y border-gray-100 py-12 my-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Frete Grátis</h3>
                <p className="text-sm text-gray-500">Em compras acima de R$ 299</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Até 12x Sem Juros</h3>
                <p className="text-sm text-gray-500">Nos cartões de crédito</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Compra Segura</h3>
                <p className="text-sm text-gray-500">Seus dados protegidos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 md:p-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm text-colorado-red">
                <Tag className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  Ofertas Imperdíveis
                </h2>
                <p className="text-sm text-gray-600">
                  Acabam em breve!
                </p>
              </div>
            </div>
            <Link 
              href="/ofertas"
              className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all"
            >
              Ver todas
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {saleProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                slug={product.slug}
                price={product.price}
                originalPrice={product.originalPrice ?? undefined}
                image={product.images[0]}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
