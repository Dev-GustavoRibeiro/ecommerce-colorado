'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    title: 'Renove sua Sala',
    subtitle: 'Sofás com até 40% OFF',
    cta: 'Ver Ofertas',
    ctaLink: '/categoria/sofas-estofados',
    // Cleaner gradient
    className: 'bg-gradient-to-r from-rose-50 to-orange-50',
    textColor: 'text-gray-900',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200',
  },
  {
    id: 2,
    title: 'Tecnologia em Alta',
    subtitle: 'Smart TVs 4K Ultra HD',
    cta: 'Confira',
    ctaLink: '/categoria/tv-audio',
    className: 'bg-gradient-to-r from-gray-900 to-slate-800',
    textColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1200',
  },
  {
    id: 3,
    title: 'Cozinha dos Sonhos',
    subtitle: 'Eletros modernos e econômicos',
    cta: 'Comprar Agora',
    ctaLink: '/categoria/cozinha',
    className: 'bg-gradient-to-r from-emerald-50 to-teal-50',
    textColor: 'text-gray-900',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200',
  },
]

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full overflow-hidden md:rounded-2xl md:mt-6 max-w-7xl mx-auto md:px-4">
      <div 
        className="relative h-[300px] md:h-[400px] w-full transition-all duration-500 ease-in-out md:rounded-2xl overflow-hidden"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            } ${slide.className}`}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                <div className="max-w-md z-20">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold mb-4 border border-white/30 uppercase tracking-wider">
                    Oferta da Semana
                  </span>
                  <h2 className={`text-3xl md:text-5xl font-bold mb-2 leading-tight ${slide.textColor}`}>
                    {slide.title}
                  </h2>
                  <p className={`text-lg md:text-xl mb-6 opacity-90 ${slide.textColor}`}>
                    {slide.subtitle}
                  </p>
                  <Link
                    href={slide.ctaLink}
                    className="inline-flex items-center gap-2 bg-colorado-red text-white px-6 py-3 rounded-xl font-semibold hover:bg-colorado-red-dark transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {slide.cta}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                
                {/* Image overlay for desktop */}
                <div 
                  className="absolute right-0 top-0 w-2/3 h-full bg-cover bg-center md:rounded-r-2xl mask-image-linear-gradient"
                  style={{ 
                    backgroundImage: `url(${slide.image})`,
                    maskImage: 'linear-gradient(to right, transparent, black 20%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%)'
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-colorado-red w-6' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
