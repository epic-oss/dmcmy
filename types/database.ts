// Database types for DMCMY - using _dmc suffix for shared Epic Buzz database
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
      companies_dmc: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          slug: string
          tagline: string | null
          description: string | null
          logo_url: string | null
          cover_image_url: string | null
          gallery_images: string[] | null
          state: string
          city: string | null
          address: string | null
          postal_code: string | null
          email: string | null
          phone: string | null
          website_url: string | null
          service_categories: string[] | null
          destination_expertise: string[] | null
          min_budget_myr: number | null
          max_budget_myr: number | null
          min_group_size: number | null
          max_group_size: number | null
          price_tier: string | null
          certifications: string[] | null
          languages: string[] | null
          established_year: number | null
          is_premium: boolean
          is_featured: boolean
          premium_started_at: string | null
          premium_expires_at: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          is_claimed: boolean
          claimed_by: string | null
          claimed_at: string | null
          meta_title: string | null
          meta_description: string | null
          is_published: boolean
          is_verified: boolean
          view_count: number
          inquiry_count: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          slug: string
          tagline?: string | null
          description?: string | null
          logo_url?: string | null
          cover_image_url?: string | null
          gallery_images?: string[] | null
          state: string
          city?: string | null
          address?: string | null
          postal_code?: string | null
          email?: string | null
          phone?: string | null
          website_url?: string | null
          service_categories?: string[] | null
          destination_expertise?: string[] | null
          min_budget_myr?: number | null
          max_budget_myr?: number | null
          min_group_size?: number | null
          max_group_size?: number | null
          price_tier?: string | null
          certifications?: string[] | null
          languages?: string[] | null
          established_year?: number | null
          is_premium?: boolean
          is_featured?: boolean
          premium_started_at?: string | null
          premium_expires_at?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          is_claimed?: boolean
          claimed_by?: string | null
          claimed_at?: string | null
          meta_title?: string | null
          meta_description?: string | null
          is_published?: boolean
          is_verified?: boolean
          view_count?: number
          inquiry_count?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          slug?: string
          tagline?: string | null
          description?: string | null
          logo_url?: string | null
          cover_image_url?: string | null
          gallery_images?: string[] | null
          state?: string
          city?: string | null
          address?: string | null
          postal_code?: string | null
          email?: string | null
          phone?: string | null
          website_url?: string | null
          service_categories?: string[] | null
          destination_expertise?: string[] | null
          min_budget_myr?: number | null
          max_budget_myr?: number | null
          min_group_size?: number | null
          max_group_size?: number | null
          price_tier?: string | null
          certifications?: string[] | null
          languages?: string[] | null
          established_year?: number | null
          is_premium?: boolean
          is_featured?: boolean
          premium_started_at?: string | null
          premium_expires_at?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          is_claimed?: boolean
          claimed_by?: string | null
          claimed_at?: string | null
          meta_title?: string | null
          meta_description?: string | null
          is_published?: boolean
          is_verified?: boolean
          view_count?: number
          inquiry_count?: number
        }
      }
      inquiries_dmc: {
        Row: {
          id: string
          created_at: string
          source: string
          company_id: string | null
          full_name: string
          email: string
          phone: string | null
          lead_company: string | null
          event_type: string | null
          group_size: string | null
          preferred_destination: string | null
          preferred_dates: string | null
          estimated_budget: string | null
          special_requirements: string | null
          message: string | null
          status: string
          webhook_sent_at: string | null
          webhook_status: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          source: string
          company_id?: string | null
          full_name: string
          email: string
          phone?: string | null
          lead_company?: string | null
          event_type?: string | null
          group_size?: string | null
          preferred_destination?: string | null
          preferred_dates?: string | null
          estimated_budget?: string | null
          special_requirements?: string | null
          message?: string | null
          status?: string
          webhook_sent_at?: string | null
          webhook_status?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          source?: string
          company_id?: string | null
          full_name?: string
          email?: string
          phone?: string | null
          lead_company?: string | null
          event_type?: string | null
          group_size?: string | null
          preferred_destination?: string | null
          preferred_dates?: string | null
          estimated_budget?: string | null
          special_requirements?: string | null
          message?: string | null
          status?: string
          webhook_sent_at?: string | null
          webhook_status?: string | null
        }
      }
      claim_requests_dmc: {
        Row: {
          id: string
          created_at: string
          company_id: string
          user_id: string
          requester_name: string
          requester_email: string
          requester_phone: string | null
          position: string | null
          verification_notes: string | null
          status: string
          reviewed_at: string | null
          reviewed_by: string | null
          rejection_reason: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          company_id: string
          user_id: string
          requester_name: string
          requester_email: string
          requester_phone?: string | null
          position?: string | null
          verification_notes?: string | null
          status?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          rejection_reason?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          company_id?: string
          user_id?: string
          requester_name?: string
          requester_email?: string
          requester_phone?: string | null
          position?: string | null
          verification_notes?: string | null
          status?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          rejection_reason?: string | null
        }
      }
    }
    Functions: {
      increment_view_count_dmc: {
        Args: {
          company_id: string
        }
        Returns: void
      }
    }
  }
}
