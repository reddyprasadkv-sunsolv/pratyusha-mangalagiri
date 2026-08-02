export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.15';
  };
  public: {
    Tables: {
      admin_profiles: {
        Row: {
          created_at: string;
          created_by: string | null;
          display_name: string;
          is_active: boolean;
          role: Database['public']['Enums']['administrator_role'];
          updated_at: string;
          updated_by: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          display_name: string;
          is_active?: boolean;
          role?: Database['public']['Enums']['administrator_role'];
          updated_at?: string;
          updated_by?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          display_name?: string;
          is_active?: boolean;
          role?: Database['public']['Enums']['administrator_role'];
          updated_at?: string;
          updated_by?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      audit_logs: {
        Row: {
          action: string;
          actor_user_id: string | null;
          created_at: string;
          entity_id: string | null;
          entity_table: string;
          id: string;
          new_values: Json | null;
          previous_values: Json | null;
          request_context: Json | null;
        };
        Insert: {
          action: string;
          actor_user_id?: string | null;
          created_at?: string;
          entity_id?: string | null;
          entity_table: string;
          id?: string;
          new_values?: Json | null;
          previous_values?: Json | null;
          request_context?: Json | null;
        };
        Update: {
          action?: string;
          actor_user_id?: string | null;
          created_at?: string;
          entity_id?: string | null;
          entity_table?: string;
          id?: string;
          new_values?: Json | null;
          previous_values?: Json | null;
          request_context?: Json | null;
        };
        Relationships: [];
      };
      contact_settings: {
        Row: {
          address_en: string | null;
          address_te: string | null;
          business_hours_en: string | null;
          business_hours_te: string | null;
          contact_key: string;
          created_at: string;
          created_by: string | null;
          email_address: string | null;
          id: string;
          instagram_handle: string | null;
          is_visible: boolean;
          phone_number: string | null;
          published_at: string | null;
          status: Database['public']['Enums']['content_status'];
          updated_at: string;
          updated_by: string | null;
          website_url: string | null;
          whatsapp_number: string | null;
        };
        Insert: {
          address_en?: string | null;
          address_te?: string | null;
          business_hours_en?: string | null;
          business_hours_te?: string | null;
          contact_key: string;
          created_at?: string;
          created_by?: string | null;
          email_address?: string | null;
          id?: string;
          instagram_handle?: string | null;
          is_visible?: boolean;
          phone_number?: string | null;
          published_at?: string | null;
          status?: Database['public']['Enums']['content_status'];
          updated_at?: string;
          updated_by?: string | null;
          website_url?: string | null;
          whatsapp_number?: string | null;
        };
        Update: {
          address_en?: string | null;
          address_te?: string | null;
          business_hours_en?: string | null;
          business_hours_te?: string | null;
          contact_key?: string;
          created_at?: string;
          created_by?: string | null;
          email_address?: string | null;
          id?: string;
          instagram_handle?: string | null;
          is_visible?: boolean;
          phone_number?: string | null;
          published_at?: string | null;
          status?: Database['public']['Enums']['content_status'];
          updated_at?: string;
          updated_by?: string | null;
          website_url?: string | null;
          whatsapp_number?: string | null;
        };
        Relationships: [];
      };
      email_delivery_logs: {
        Row: {
          attempt_number: number;
          created_at: string;
          delivery_status: string;
          error_code: string | null;
          error_summary: string | null;
          id: string;
          lead_id: string | null;
          message_type: string;
          provider: string | null;
          provider_message_id: string | null;
          updated_at: string;
        };
        Insert: {
          attempt_number?: number;
          created_at?: string;
          delivery_status: string;
          error_code?: string | null;
          error_summary?: string | null;
          id?: string;
          lead_id?: string | null;
          message_type: string;
          provider?: string | null;
          provider_message_id?: string | null;
          updated_at?: string;
        };
        Update: {
          attempt_number?: number;
          created_at?: string;
          delivery_status?: string;
          error_code?: string | null;
          error_summary?: string | null;
          id?: string;
          lead_id?: string | null;
          message_type?: string;
          provider?: string | null;
          provider_message_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'email_delivery_logs_lead_id_fkey';
            columns: ['lead_id'];
            isOneToOne: false;
            referencedRelation: 'leads';
            referencedColumns: ['id'];
          },
        ];
      };
      faqs: {
        Row: {
          answer_en: string;
          answer_te: string;
          created_at: string;
          created_by: string | null;
          display_order: number;
          faq_key: string;
          id: string;
          include_in_schema: boolean;
          is_visible: boolean;
          published_at: string | null;
          question_en: string;
          question_te: string;
          status: Database['public']['Enums']['content_status'];
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          answer_en: string;
          answer_te: string;
          created_at?: string;
          created_by?: string | null;
          display_order?: number;
          faq_key: string;
          id?: string;
          include_in_schema?: boolean;
          is_visible?: boolean;
          published_at?: string | null;
          question_en: string;
          question_te: string;
          status?: Database['public']['Enums']['content_status'];
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          answer_en?: string;
          answer_te?: string;
          created_at?: string;
          created_by?: string | null;
          display_order?: number;
          faq_key?: string;
          id?: string;
          include_in_schema?: boolean;
          is_visible?: boolean;
          published_at?: string | null;
          question_en?: string;
          question_te?: string;
          status?: Database['public']['Enums']['content_status'];
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      founder_profiles: {
        Row: {
          created_at: string;
          created_by: string | null;
          credentials_en: Json;
          credentials_te: Json;
          full_bio_en: string | null;
          full_bio_te: string | null;
          id: string;
          is_visible: boolean;
          name: string;
          portrait_asset_id: string | null;
          profile_key: string;
          published_at: string | null;
          short_bio_en: string | null;
          short_bio_te: string | null;
          status: Database['public']['Enums']['content_status'];
          title_en: string | null;
          title_te: string | null;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          credentials_en?: Json;
          credentials_te?: Json;
          full_bio_en?: string | null;
          full_bio_te?: string | null;
          id?: string;
          is_visible?: boolean;
          name: string;
          portrait_asset_id?: string | null;
          profile_key: string;
          published_at?: string | null;
          short_bio_en?: string | null;
          short_bio_te?: string | null;
          status?: Database['public']['Enums']['content_status'];
          title_en?: string | null;
          title_te?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          credentials_en?: Json;
          credentials_te?: Json;
          full_bio_en?: string | null;
          full_bio_te?: string | null;
          id?: string;
          is_visible?: boolean;
          name?: string;
          portrait_asset_id?: string | null;
          profile_key?: string;
          published_at?: string | null;
          short_bio_en?: string | null;
          short_bio_te?: string | null;
          status?: Database['public']['Enums']['content_status'];
          title_en?: string | null;
          title_te?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'founder_profiles_portrait_asset_id_fkey';
            columns: ['portrait_asset_id'];
            isOneToOne: false;
            referencedRelation: 'media_assets';
            referencedColumns: ['id'];
          },
        ];
      };
      leads: {
        Row: {
          assigned_to: string | null;
          city: string | null;
          consent_given: boolean;
          consent_text_version: string | null;
          contacted_at: string | null;
          converted_at: string | null;
          created_at: string;
          email_address: string | null;
          full_name: string;
          id: string;
          internal_notes: string | null;
          message: string | null;
          mobile_number: string;
          preferred_language: string;
          requirement_key: string;
          source_page: string;
          status: Database['public']['Enums']['lead_status'];
          updated_at: string;
        };
        Insert: {
          assigned_to?: string | null;
          city?: string | null;
          consent_given: boolean;
          consent_text_version?: string | null;
          contacted_at?: string | null;
          converted_at?: string | null;
          created_at?: string;
          email_address?: string | null;
          full_name: string;
          id?: string;
          internal_notes?: string | null;
          message?: string | null;
          mobile_number: string;
          preferred_language: string;
          requirement_key: string;
          source_page: string;
          status?: Database['public']['Enums']['lead_status'];
          updated_at?: string;
        };
        Update: {
          assigned_to?: string | null;
          city?: string | null;
          consent_given?: boolean;
          consent_text_version?: string | null;
          contacted_at?: string | null;
          converted_at?: string | null;
          created_at?: string;
          email_address?: string | null;
          full_name?: string;
          id?: string;
          internal_notes?: string | null;
          message?: string | null;
          mobile_number?: string;
          preferred_language?: string;
          requirement_key?: string;
          source_page?: string;
          status?: Database['public']['Enums']['lead_status'];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'leads_assigned_to_fkey';
            columns: ['assigned_to'];
            isOneToOne: false;
            referencedRelation: 'admin_profiles';
            referencedColumns: ['user_id'];
          },
        ];
      };
      legal_pages: {
        Row: {
          content_en: string;
          content_te: string | null;
          created_at: string;
          created_by: string | null;
          effective_at: string | null;
          id: string;
          is_indexable: boolean;
          is_visible: boolean;
          legal_key: string;
          published_at: string | null;
          review_status: Database['public']['Enums']['legal_review_status'];
          slug_en: string;
          slug_te: string | null;
          title_en: string;
          title_te: string | null;
          updated_at: string;
          updated_by: string | null;
          version: string | null;
        };
        Insert: {
          content_en: string;
          content_te?: string | null;
          created_at?: string;
          created_by?: string | null;
          effective_at?: string | null;
          id?: string;
          is_indexable?: boolean;
          is_visible?: boolean;
          legal_key: string;
          published_at?: string | null;
          review_status?: Database['public']['Enums']['legal_review_status'];
          slug_en: string;
          slug_te?: string | null;
          title_en: string;
          title_te?: string | null;
          updated_at?: string;
          updated_by?: string | null;
          version?: string | null;
        };
        Update: {
          content_en?: string;
          content_te?: string | null;
          created_at?: string;
          created_by?: string | null;
          effective_at?: string | null;
          id?: string;
          is_indexable?: boolean;
          is_visible?: boolean;
          legal_key?: string;
          published_at?: string | null;
          review_status?: Database['public']['Enums']['legal_review_status'];
          slug_en?: string;
          slug_te?: string | null;
          title_en?: string;
          title_te?: string | null;
          updated_at?: string;
          updated_by?: string | null;
          version?: string | null;
        };
        Relationships: [];
      };
      media_assets: {
        Row: {
          alt_text_en: string | null;
          alt_text_te: string | null;
          bucket_name: string;
          caption_en: string | null;
          caption_te: string | null;
          created_at: string;
          created_by: string | null;
          file_size_bytes: number | null;
          height: number | null;
          id: string;
          is_public: boolean;
          mime_type: string;
          object_path: string;
          original_filename: string | null;
          status: Database['public']['Enums']['media_status'];
          updated_at: string;
          updated_by: string | null;
          width: number | null;
        };
        Insert: {
          alt_text_en?: string | null;
          alt_text_te?: string | null;
          bucket_name: string;
          caption_en?: string | null;
          caption_te?: string | null;
          created_at?: string;
          created_by?: string | null;
          file_size_bytes?: number | null;
          height?: number | null;
          id?: string;
          is_public?: boolean;
          mime_type: string;
          object_path: string;
          original_filename?: string | null;
          status?: Database['public']['Enums']['media_status'];
          updated_at?: string;
          updated_by?: string | null;
          width?: number | null;
        };
        Update: {
          alt_text_en?: string | null;
          alt_text_te?: string | null;
          bucket_name?: string;
          caption_en?: string | null;
          caption_te?: string | null;
          created_at?: string;
          created_by?: string | null;
          file_size_bytes?: number | null;
          height?: number | null;
          id?: string;
          is_public?: boolean;
          mime_type?: string;
          object_path?: string;
          original_filename?: string | null;
          status?: Database['public']['Enums']['media_status'];
          updated_at?: string;
          updated_by?: string | null;
          width?: number | null;
        };
        Relationships: [];
      };
      page_sections: {
        Row: {
          body_en: string | null;
          body_te: string | null;
          created_at: string;
          created_by: string | null;
          display_order: number;
          heading_en: string | null;
          heading_te: string | null;
          id: string;
          is_visible: boolean;
          media_asset_id: string | null;
          metadata: Json;
          page_key: string;
          primary_cta_en: string | null;
          primary_cta_target: string | null;
          primary_cta_te: string | null;
          published_at: string | null;
          secondary_cta_en: string | null;
          secondary_cta_target: string | null;
          secondary_cta_te: string | null;
          section_key: string;
          status: Database['public']['Enums']['content_status'];
          subheading_en: string | null;
          subheading_te: string | null;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          body_en?: string | null;
          body_te?: string | null;
          created_at?: string;
          created_by?: string | null;
          display_order?: number;
          heading_en?: string | null;
          heading_te?: string | null;
          id?: string;
          is_visible?: boolean;
          media_asset_id?: string | null;
          metadata?: Json;
          page_key: string;
          primary_cta_en?: string | null;
          primary_cta_target?: string | null;
          primary_cta_te?: string | null;
          published_at?: string | null;
          secondary_cta_en?: string | null;
          secondary_cta_target?: string | null;
          secondary_cta_te?: string | null;
          section_key: string;
          status?: Database['public']['Enums']['content_status'];
          subheading_en?: string | null;
          subheading_te?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          body_en?: string | null;
          body_te?: string | null;
          created_at?: string;
          created_by?: string | null;
          display_order?: number;
          heading_en?: string | null;
          heading_te?: string | null;
          id?: string;
          is_visible?: boolean;
          media_asset_id?: string | null;
          metadata?: Json;
          page_key?: string;
          primary_cta_en?: string | null;
          primary_cta_target?: string | null;
          primary_cta_te?: string | null;
          published_at?: string | null;
          secondary_cta_en?: string | null;
          secondary_cta_target?: string | null;
          secondary_cta_te?: string | null;
          section_key?: string;
          status?: Database['public']['Enums']['content_status'];
          subheading_en?: string | null;
          subheading_te?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'page_sections_media_asset_id_fkey';
            columns: ['media_asset_id'];
            isOneToOne: false;
            referencedRelation: 'media_assets';
            referencedColumns: ['id'];
          },
        ];
      };
      products: {
        Row: {
          audience_en: Json;
          audience_te: Json;
          available_sizes: Json;
          benefits_en: Json;
          benefits_te: Json;
          created_at: string;
          created_by: string | null;
          currency: string | null;
          display_order: number;
          id: string;
          image_alt_en: string | null;
          image_alt_te: string | null;
          image_asset_id: string | null;
          is_featured: boolean;
          is_visible: boolean;
          long_description_en: string | null;
          long_description_te: string | null;
          material_en: string | null;
          material_te: string | null;
          name_en: string;
          name_te: string;
          price: number | null;
          product_key: string;
          published_at: string | null;
          short_description_en: string | null;
          short_description_te: string | null;
          slug: string;
          status: Database['public']['Enums']['content_status'];
          stock_status: string | null;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          audience_en?: Json;
          audience_te?: Json;
          available_sizes?: Json;
          benefits_en?: Json;
          benefits_te?: Json;
          created_at?: string;
          created_by?: string | null;
          currency?: string | null;
          display_order?: number;
          id?: string;
          image_alt_en?: string | null;
          image_alt_te?: string | null;
          image_asset_id?: string | null;
          is_featured?: boolean;
          is_visible?: boolean;
          long_description_en?: string | null;
          long_description_te?: string | null;
          material_en?: string | null;
          material_te?: string | null;
          name_en: string;
          name_te: string;
          price?: number | null;
          product_key: string;
          published_at?: string | null;
          short_description_en?: string | null;
          short_description_te?: string | null;
          slug: string;
          status?: Database['public']['Enums']['content_status'];
          stock_status?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          audience_en?: Json;
          audience_te?: Json;
          available_sizes?: Json;
          benefits_en?: Json;
          benefits_te?: Json;
          created_at?: string;
          created_by?: string | null;
          currency?: string | null;
          display_order?: number;
          id?: string;
          image_alt_en?: string | null;
          image_alt_te?: string | null;
          image_asset_id?: string | null;
          is_featured?: boolean;
          is_visible?: boolean;
          long_description_en?: string | null;
          long_description_te?: string | null;
          material_en?: string | null;
          material_te?: string | null;
          name_en?: string;
          name_te?: string;
          price?: number | null;
          product_key?: string;
          published_at?: string | null;
          short_description_en?: string | null;
          short_description_te?: string | null;
          slug?: string;
          status?: Database['public']['Enums']['content_status'];
          stock_status?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'products_image_asset_id_fkey';
            columns: ['image_asset_id'];
            isOneToOne: false;
            referencedRelation: 'media_assets';
            referencedColumns: ['id'];
          },
        ];
      };
      ritual_items: {
        Row: {
          created_at: string;
          created_by: string | null;
          delivery_method: string | null;
          description_en: string | null;
          description_te: string | null;
          display_order: number;
          duration_text: string | null;
          frequency: string | null;
          id: string;
          is_visible: boolean;
          published_at: string | null;
          ritual_key: string;
          status: Database['public']['Enums']['content_status'];
          title_en: string;
          title_te: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          delivery_method?: string | null;
          description_en?: string | null;
          description_te?: string | null;
          display_order?: number;
          duration_text?: string | null;
          frequency?: string | null;
          id?: string;
          is_visible?: boolean;
          published_at?: string | null;
          ritual_key: string;
          status?: Database['public']['Enums']['content_status'];
          title_en: string;
          title_te: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          delivery_method?: string | null;
          description_en?: string | null;
          description_te?: string | null;
          display_order?: number;
          duration_text?: string | null;
          frequency?: string | null;
          id?: string;
          is_visible?: boolean;
          published_at?: string | null;
          ritual_key?: string;
          status?: Database['public']['Enums']['content_status'];
          title_en?: string;
          title_te?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      seo_pages: {
        Row: {
          canonical_path_en: string;
          canonical_path_te: string | null;
          created_at: string;
          created_by: string | null;
          id: string;
          is_indexable: boolean;
          is_visible: boolean;
          meta_description_en: string;
          meta_description_te: string | null;
          meta_title_en: string;
          meta_title_te: string | null;
          og_description_en: string | null;
          og_description_te: string | null;
          og_image_alt_en: string | null;
          og_image_alt_te: string | null;
          og_image_asset_id: string | null;
          og_title_en: string | null;
          og_title_te: string | null;
          published_at: string | null;
          robots_directive: string;
          route_en: string;
          route_key: string;
          route_te: string | null;
          status: Database['public']['Enums']['content_status'];
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          canonical_path_en: string;
          canonical_path_te?: string | null;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          is_indexable?: boolean;
          is_visible?: boolean;
          meta_description_en: string;
          meta_description_te?: string | null;
          meta_title_en: string;
          meta_title_te?: string | null;
          og_description_en?: string | null;
          og_description_te?: string | null;
          og_image_alt_en?: string | null;
          og_image_alt_te?: string | null;
          og_image_asset_id?: string | null;
          og_title_en?: string | null;
          og_title_te?: string | null;
          published_at?: string | null;
          robots_directive?: string;
          route_en: string;
          route_key: string;
          route_te?: string | null;
          status?: Database['public']['Enums']['content_status'];
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          canonical_path_en?: string;
          canonical_path_te?: string | null;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          is_indexable?: boolean;
          is_visible?: boolean;
          meta_description_en?: string;
          meta_description_te?: string | null;
          meta_title_en?: string;
          meta_title_te?: string | null;
          og_description_en?: string | null;
          og_description_te?: string | null;
          og_image_alt_en?: string | null;
          og_image_alt_te?: string | null;
          og_image_asset_id?: string | null;
          og_title_en?: string | null;
          og_title_te?: string | null;
          published_at?: string | null;
          robots_directive?: string;
          route_en?: string;
          route_key?: string;
          route_te?: string | null;
          status?: Database['public']['Enums']['content_status'];
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'seo_pages_og_image_asset_id_fkey';
            columns: ['og_image_asset_id'];
            isOneToOne: false;
            referencedRelation: 'media_assets';
            referencedColumns: ['id'];
          },
        ];
      };
      site_settings: {
        Row: {
          brand_name: string | null;
          created_at: string;
          created_by: string | null;
          default_language: string;
          id: string;
          is_maintenance_mode: boolean;
          is_published: boolean;
          site_key: string;
          site_url: string | null;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          brand_name?: string | null;
          created_at?: string;
          created_by?: string | null;
          default_language?: string;
          id?: string;
          is_maintenance_mode?: boolean;
          is_published?: boolean;
          site_key: string;
          site_url?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          brand_name?: string | null;
          created_at?: string;
          created_by?: string | null;
          default_language?: string;
          id?: string;
          is_maintenance_mode?: boolean;
          is_published?: boolean;
          site_key?: string;
          site_url?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      testimonials: {
        Row: {
          city_or_designation: string | null;
          consent_recorded_at: string | null;
          created_at: string;
          created_by: string | null;
          customer_consent: boolean;
          customer_name: string;
          display_order: number;
          id: string;
          image_consent: boolean;
          is_visible: boolean;
          media_asset_id: string | null;
          product_id: string | null;
          published_at: string | null;
          status: Database['public']['Enums']['content_status'];
          testimonial_en: string;
          testimonial_te: string | null;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          city_or_designation?: string | null;
          consent_recorded_at?: string | null;
          created_at?: string;
          created_by?: string | null;
          customer_consent?: boolean;
          customer_name: string;
          display_order?: number;
          id?: string;
          image_consent?: boolean;
          is_visible?: boolean;
          media_asset_id?: string | null;
          product_id?: string | null;
          published_at?: string | null;
          status?: Database['public']['Enums']['content_status'];
          testimonial_en: string;
          testimonial_te?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          city_or_designation?: string | null;
          consent_recorded_at?: string | null;
          created_at?: string;
          created_by?: string | null;
          customer_consent?: boolean;
          customer_name?: string;
          display_order?: number;
          id?: string;
          image_consent?: boolean;
          is_visible?: boolean;
          media_asset_id?: string | null;
          product_id?: string | null;
          published_at?: string | null;
          status?: Database['public']['Enums']['content_status'];
          testimonial_en?: string;
          testimonial_te?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'testimonials_media_asset_id_fkey';
            columns: ['media_asset_id'];
            isOneToOne: false;
            referencedRelation: 'media_assets';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'testimonials_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      current_admin_profile: {
        Args: never;
        Returns: {
          display_name: string;
          is_active: boolean;
          role: Database['public']['Enums']['administrator_role'];
          user_id: string;
        }[];
      };
      current_admin_role: {
        Args: never;
        Returns: Database['public']['Enums']['administrator_role'];
      };
      is_active_admin: { Args: never; Returns: boolean };
      is_editor_or_owner: { Args: never; Returns: boolean };
      is_owner: { Args: never; Returns: boolean };
    };
    Enums: {
      administrator_role: 'owner' | 'editor';
      content_status: 'draft' | 'client_review' | 'approved' | 'published' | 'archived';
      lead_status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed' | 'spam';
      legal_review_status:
        'draft' | 'client_review' | 'legal_review' | 'approved' | 'published' | 'archived';
      media_status: 'draft' | 'approved' | 'published' | 'archived';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema['Enums'] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema['CompositeTypes'] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      administrator_role: ['owner', 'editor'],
      content_status: ['draft', 'client_review', 'approved', 'published', 'archived'],
      lead_status: ['new', 'contacted', 'qualified', 'converted', 'closed', 'spam'],
      legal_review_status: [
        'draft',
        'client_review',
        'legal_review',
        'approved',
        'published',
        'archived',
      ],
      media_status: ['draft', 'approved', 'published', 'archived'],
    },
  },
} as const;
