export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          created_at: string
          name: string
          slug: string
          description: string
          price: number
          original_price: number | null
          category_id: string
          images: string[]
          stock: number
          featured: boolean
          specifications: Json
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          slug: string
          description: string
          price: number
          original_price?: number | null
          category_id: string
          images: string[]
          stock?: number
          featured?: boolean
          specifications?: Json
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          slug?: string
          description?: string
          price?: number
          original_price?: number | null
          category_id?: string
          images?: string[]
          stock?: number
          featured?: boolean
          specifications?: Json
        }
      }
      categories: {
        Row: {
          id: string
          created_at: string
          name: string
          slug: string
          description: string
          image: string
          icon: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          slug: string
          description: string
          image: string
          icon: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          slug?: string
          description?: string
          image?: string
          icon?: string
        }
      }
      orders: {
        Row: {
          id: string
          created_at: string
          user_id: string
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total: number
          shipping_address: Json
          items: Json
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total: number
          shipping_address: Json
          items: Json
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total?: number
          shipping_address?: Json
          items?: Json
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Product = Database['public']['Tables']['products']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type Order = Database['public']['Tables']['orders']['Row']
