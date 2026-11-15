export type BlogStatus = "draft" | "published";

export type BlogCitation = {
  id: string;
  post_id: string;
  order_index: number;
  title: string;
  author: string;
  publisher: string;
  url: string;
  published_at: string | null;
  accessed_at: string | null;
};

export type BlogPostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body_html: string;
  cover_image_url: string;
  cover_image_alt: string;
  author_name: string;
  tags: string[];
  status: BlogStatus;
  published_at: string | null;
  seo_title: string;
  seo_description: string;
  created_at: string;
  updated_at: string;
};

export type BlogPost = BlogPostRow & { citations: BlogCitation[] };

type BlogPostInsert = Omit<BlogPostRow, "id" | "created_at" | "updated_at">;
type BlogPostUpdate = Partial<BlogPostInsert>;
type BlogCitationInsert = Omit<BlogCitation, "id">;

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: BlogPostRow;
        Insert: BlogPostInsert;
        Update: BlogPostUpdate;
        Relationships: [];
      };
      blog_citations: {
        Row: BlogCitation;
        Insert: BlogCitationInsert;
        Update: Partial<BlogCitationInsert>;
        Relationships: [
          {
            foreignKeyName: "blog_citations_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "blog_posts";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      save_blog_post: {
        Args: { p_post: Json; p_citations: Json };
        Returns: { id: string; slug: string }[];
      };
    };
    Enums: { blog_post_status: BlogStatus };
    CompositeTypes: { [_ in never]: never };
  };
};

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];
