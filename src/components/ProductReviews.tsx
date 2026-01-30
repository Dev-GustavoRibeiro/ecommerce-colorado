'use client'

import { useState } from 'react'
import { Star, ThumbsUp, User } from 'lucide-react'

export function ProductReviews() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: 'Maria Silva',
      date: '12/01/2026',
      rating: 5,
      title: 'Excelente produto!',
      content: 'Amei a qualidade, chegou antes do prazo e superou minhas expectativas. Recomendo muito!',
      likes: 12
    },
    {
      id: 2,
      author: 'João Souza',
      date: '10/01/2026',
      rating: 4,
      title: 'Muito bom',
      content: 'Produto muito bom, acabamento de primeira. Só a entrega que demorou um pouquinho, mas valeu a pena.',
      likes: 5
    },
    {
      id: 3,
      author: 'Ana Oliveira',
      date: '05/01/2026',
      rating: 5,
      title: 'Perfeito',
      content: 'Simplesmente perfeito. Comprarei novamente com certeza.',
      likes: 8
    }
  ])

  return (
    <section className="mt-16 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8" id="reviews">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Avaliações dos Clientes</h2>
      
      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        {/* Summary */}
        <div className="md:col-span-1">
          <div className="flex items-end gap-2 mb-4">
            <span className="text-5xl font-bold text-gray-900">4.8</span>
            <div className="flex flex-col mb-1">
              <div className="flex text-yellow-400 mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-500">Baseado em 128 avaliações</span>
            </div>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-3">{star}</span>
                <Star className="w-3 h-3 text-gray-400" />
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: star === 5 ? '70%' : star === 4 ? '20%' : '5%' }}
                  />
                </div>
                <span className="w-8 text-right text-gray-400">
                  {star === 5 ? '70%' : star === 4 ? '20%' : '5%'}
                </span>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 bg-white border border-gray-300 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-colors">
            Escrever Avaliação
          </button>
        </div>

        {/* Reviews List */}
        <div className="md:col-span-2 space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{review.author}</h4>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} 
                    />
                  ))}
                </div>
              </div>
              
              <h5 className="font-bold text-gray-800 mb-2">{review.title}</h5>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {review.content}
              </p>
              
              <button className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition-colors">
                <ThumbsUp className="w-3.5 h-3.5" />
                Útil ({review.likes})
              </button>
            </div>
          ))}

          <button className="text-colorado-red font-semibold text-sm hover:underline">
            Carregar mais avaliações
          </button>
        </div>
      </div>
    </section>
  )
}
