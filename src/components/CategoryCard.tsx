import Link from 'next/link'
import Image from 'next/image'
import { 
  Sofa, 
  ChefHat, 
  Bed, 
  Tv, 
  Shirt, 
  Wind,
  LucideIcon
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Sofa,
  ChefHat,
  Bed,
  Tv,
  Shirt,
  Wind,
}

interface CategoryCardProps {
  name: string
  slug: string
  image: string
  icon: string
  description?: string
  variant?: 'default' | 'compact'
}

export function CategoryCard({
  name,
  slug,
  image,
  icon,
  description,
  variant = 'default',
}: CategoryCardProps) {
  const Icon = iconMap[icon] || Sofa

  if (variant === 'compact') {
    return (
      <Link 
        href={`/categoria/${slug}`}
        className="group flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 hover:border-colorado-red/30 hover:shadow-md transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-full bg-gray-50 group-hover:bg-colorado-red/10 flex items-center justify-center transition-colors">
          <Icon className="w-6 h-6 text-gray-600 group-hover:text-colorado-red transition-colors" />
        </div>
        <span className="text-xs font-medium text-gray-700 text-center group-hover:text-colorado-red line-clamp-1">
          {name}
        </span>
      </Link>
    )
  }

  return (
    <Link 
      href={`/categoria/${slug}`}
      className="group relative overflow-hidden rounded-2xl aspect-[4/3] block"
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg leading-none mb-1">{name}</h3>
            {description && (
              <p className="text-white/70 text-xs line-clamp-1">{description}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
