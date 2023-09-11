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
      servers: {
        Row: {
          cfx_hash: string
          created_at: string | null
          endpoint: string | null
          id: number
        }
        Insert: {
          cfx_hash: string
          created_at?: string | null
          endpoint?: string | null
          id?: number
        }
        Update: {
          cfx_hash?: string
          created_at?: string | null
          endpoint?: string | null
          id?: number
        }
        Relationships: []
      }
      servers_pages: {
        Row: {
          created_at: string | null
          description: string | null
          followers: number | null
          id: number
          likes: number | null
          manager_id: string | null
          views: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          followers?: number | null
          id: number
          likes?: number | null
          manager_id?: string | null
          views?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          followers?: number | null
          id?: number
          likes?: number | null
          manager_id?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "servers_pages_id_fkey"
            columns: ["id"]
            referencedRelation: "servers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "servers_pages_manager_id_fkey"
            columns: ["manager_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      servers_pages_links: {
        Row: {
          created_at: string | null
          id: number
          platform: number | null
          redirect_url: string
          server_id: number
          type: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          platform?: number | null
          redirect_url: string
          server_id: number
          type?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          platform?: number | null
          redirect_url?: string
          server_id?: number
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "servers_pages_links_server_id_fkey"
            columns: ["server_id"]
            referencedRelation: "servers"
            referencedColumns: ["id"]
          }
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
            foreignKeyName: "user_activities_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_connections: {
        Row: {
          connection: Database["public"]["Enums"]["connections_type"]
          created_at: string | null
          identifier: string
          user_id: string
        }
        Insert: {
          connection: Database["public"]["Enums"]["connections_type"]
          created_at?: string | null
          identifier?: string
          user_id: string
        }
        Update: {
          connection?: Database["public"]["Enums"]["connections_type"]
          created_at?: string | null
          identifier?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_connections_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
            foreignKeyName: "user_follows_author_id_fkey"
            columns: ["author_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_follows_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
            foreignKeyName: "user_plans_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_social_media: {
        Row: {
          created_at: string
          profile_id: string
          social_media: Database["public"]["Enums"]["social_media_name"]
          user_id: string
        }
        Insert: {
          created_at?: string
          profile_id: string
          social_media: Database["public"]["Enums"]["social_media_name"]
          user_id: string
        }
        Update: {
          created_at?: string
          profile_id?: string
          social_media?: Database["public"]["Enums"]["social_media_name"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_social_media_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
            foreignKeyName: "user_views_author_id_fkey"
            columns: ["author_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_views_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          banner_url: string | null
          created_at: string | null
          custom_id: string
          description: string | null
          followers: number | null
          id: string
          likes: number | null
          stream_url: string | null
          updated_at: string | null
          views: number | null
        }
        Insert: {
          avatar_url?: string | null
          banner_url?: string | null
          created_at?: string | null
          custom_id: string
          description?: string | null
          followers?: number | null
          id: string
          likes?: number | null
          stream_url?: string | null
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          avatar_url?: string | null
          banner_url?: string | null
          created_at?: string | null
          custom_id?: string
          description?: string | null
          followers?: number | null
          id?: string
          likes?: number | null
          stream_url?: string | null
          updated_at?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
      connections_type: "DISCORD" | "STEAM"
      payment_status_type: "APPROVED" | "CANCELED" | "PENDING"
      social_media_name:
        | "TWITCH"
        | "YOUTUBE"
        | "FACEBOOK"
        | "TIKTOK"
        | "GITHUB"
        | "INSTAGRAM"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
