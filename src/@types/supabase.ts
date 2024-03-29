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
      orders: {
        Row: {
          created_at: string
          id: string
          order_data: Json
          owner_id: string
          payment_data: Json | null
          transaction_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          order_data: Json
          owner_id: string
          payment_data?: Json | null
          transaction_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          order_data?: Json
          owner_id?: string
          payment_data?: Json | null
          transaction_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'orders_owner_id_fkey'
            columns: ['owner_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      page_connections: {
        Row: {
          created_at: string
          name: string
          page_id: string
          redirect_url: string
        }
        Insert: {
          created_at?: string
          name: string
          page_id: string
          redirect_url: string
        }
        Update: {
          created_at?: string
          name?: string
          page_id?: string
          redirect_url?: string
        }
        Relationships: [
          {
            foreignKeyName: 'page_connections_page_id_fkey'
            columns: ['page_id']
            isOneToOne: false
            referencedRelation: 'pages'
            referencedColumns: ['id']
          },
        ]
      }
      page_likes: {
        Row: {
          author_id: string
          created_at: string
          id: number
          page_id: string
        }
        Insert: {
          author_id: string
          created_at?: string
          id?: number
          page_id: string
        }
        Update: {
          author_id?: string
          created_at?: string
          id?: number
          page_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'page_likes_author_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'page_likes_page_id_fkey'
            columns: ['page_id']
            isOneToOne: false
            referencedRelation: 'pages'
            referencedColumns: ['id']
          },
        ]
      }
      page_review_replies: {
        Row: {
          content: string
          created_at: string
          review_id: string
        }
        Insert: {
          content: string
          created_at?: string
          review_id: string
        }
        Update: {
          content?: string
          created_at?: string
          review_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'page_review_replies_review_id_fkey'
            columns: ['review_id']
            isOneToOne: true
            referencedRelation: 'page_reviews'
            referencedColumns: ['id']
          },
        ]
      }
      page_reviews: {
        Row: {
          author_id: string
          content: string
          created_at: string
          id: string
          page_id: string
          rating: number
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          id?: string
          page_id: string
          rating: number
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          id?: string
          page_id?: string
          rating?: number
        }
        Relationships: [
          {
            foreignKeyName: 'page_reviews_author_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'page_reviews_page_id_fkey'
            columns: ['page_id']
            isOneToOne: false
            referencedRelation: 'pages'
            referencedColumns: ['id']
          },
        ]
      }
      page_social_media: {
        Row: {
          created_at: string
          page_id: string
          profile_id: string
          social_media: Database['public']['Enums']['social_media_name']
        }
        Insert: {
          created_at?: string
          page_id: string
          profile_id: string
          social_media: Database['public']['Enums']['social_media_name']
        }
        Update: {
          created_at?: string
          page_id?: string
          profile_id?: string
          social_media?: Database['public']['Enums']['social_media_name']
        }
        Relationships: [
          {
            foreignKeyName: 'page_social_media_page_id_fkey'
            columns: ['page_id']
            isOneToOne: false
            referencedRelation: 'pages'
            referencedColumns: ['id']
          },
        ]
      }
      pages: {
        Row: {
          banner_url: string | null
          created_at: string
          custom_id: string
          description: string | null
          followers: number
          id: string
          likes: number
          owner_id: string | null
          reviews: number
          views: number
        }
        Insert: {
          banner_url?: string | null
          created_at?: string
          custom_id: string
          description?: string | null
          followers?: number
          id?: string
          likes?: number
          owner_id?: string | null
          reviews?: number
          views?: number
        }
        Update: {
          banner_url?: string | null
          created_at?: string
          custom_id?: string
          description?: string | null
          followers?: number
          id?: string
          likes?: number
          owner_id?: string | null
          reviews?: number
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: 'pages_owner_id_fkey'
            columns: ['owner_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      servers: {
        Row: {
          created_at: string
          endpoint: string | null
          id: string
          page_id: string | null
        }
        Insert: {
          created_at?: string
          endpoint?: string | null
          id: string
          page_id?: string | null
        }
        Update: {
          created_at?: string
          endpoint?: string | null
          id?: string
          page_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'servers_page_id_fkey'
            columns: ['page_id']
            isOneToOne: true
            referencedRelation: 'pages'
            referencedColumns: ['id']
          },
        ]
      }
      user_activities: {
        Row: {
          created_at: string
          id: number
          message: string
          points: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          message?: string
          points: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          message?: string
          points?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'user_activities_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      user_connections: {
        Row: {
          connection: Database['public']['Enums']['connections_type']
          created_at: string
          identifier: string
          user_id: string
        }
        Insert: {
          connection: Database['public']['Enums']['connections_type']
          created_at?: string
          identifier?: string
          user_id: string
        }
        Update: {
          connection?: Database['public']['Enums']['connections_type']
          created_at?: string
          identifier?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_connections_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      user_follows: {
        Row: {
          author_id: string
          created_at: string
          user_id: string
        }
        Insert: {
          author_id: string
          created_at?: string
          user_id: string
        }
        Update: {
          author_id?: string
          created_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_follows_author_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_follows_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      user_plans: {
        Row: {
          created_at: string
          expire_at: string
          payment_transaction_id: string
          plan_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          expire_at: string
          payment_transaction_id: string
          plan_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          expire_at?: string
          payment_transaction_id?: string
          plan_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_plans_user_id_fkey'
            columns: ['user_id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      user_social_media: {
        Row: {
          created_at: string
          profile_id: string
          social_media: Database['public']['Enums']['social_media_name']
          user_id: string
        }
        Insert: {
          created_at?: string
          profile_id: string
          social_media: Database['public']['Enums']['social_media_name']
          user_id: string
        }
        Update: {
          created_at?: string
          profile_id?: string
          social_media?: Database['public']['Enums']['social_media_name']
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_social_media_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      user_views: {
        Row: {
          author_id: string
          created_at: string
          user_id: string
        }
        Insert: {
          author_id: string
          created_at?: string
          user_id: string
        }
        Update: {
          author_id?: string
          created_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_views_author_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_views_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          banner_url: string | null
          created_at: string
          custom_id: string
          description: string | null
          followers: number
          id: string
          likes: number
          stream_url: string | null
          updated_at: string
          views: number
        }
        Insert: {
          avatar_url?: string | null
          banner_url?: string | null
          created_at?: string
          custom_id: string
          description?: string | null
          followers?: number
          id: string
          likes?: number
          stream_url?: string | null
          updated_at?: string
          views?: number
        }
        Update: {
          avatar_url?: string | null
          banner_url?: string | null
          created_at?: string
          custom_id?: string
          description?: string | null
          followers?: number
          id?: string
          likes?: number
          stream_url?: string | null
          updated_at?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      connections_type: 'DISCORD' | 'STEAM'
      payment_method_type: 'PIX' | 'TICKET' | 'CREDIT_CARD'
      payment_status_type: 'APPROVED' | 'CANCELED' | 'PENDING'
      social_media_name:
        | 'TWITCH'
        | 'YOUTUBE'
        | 'FACEBOOK'
        | 'TIKTOK'
        | 'GITHUB'
        | 'INSTAGRAM'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
      Database['public']['Views'])
  ? (Database['public']['Tables'] &
      Database['public']['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
  ? Database['public']['Enums'][PublicEnumNameOrOptions]
  : never
