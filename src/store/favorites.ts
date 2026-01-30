import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface FavoriteItem {
  id: string
  name: string
  slug: string
  price: number
  image: string
  originalPrice?: number
}

interface FavoritesState {
  items: FavoriteItem[]
  addItem: (item: FavoriteItem) => void
  removeItem: (id: string) => void
  isFavorite: (id: string) => boolean
  toggleFavorite: (item: FavoriteItem) => void
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      isFavorite: (id) => get().items.some((i) => i.id === id),
      toggleFavorite: (item) => {
        const { isFavorite, addItem, removeItem } = get()
        if (isFavorite(item.id)) {
          removeItem(item.id)
        } else {
          addItem(item)
        }
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
)
