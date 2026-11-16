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
export type BlogCommentStatus = "pending" | "approved" | "rejected";
export type BlogComment = {
  id: string;
  post_id: string;
  author_name: string;
  body: string;
  status: BlogCommentStatus;
  created_at: string;
  moderated_at: string | null;
};
type BlogCommentInsert = Omit<BlogComment, "id" | "created_at" | "moderated_at">;
type BlogCommentUpdate = Partial<Omit<BlogComment, "id" | "created_at">>;
export type NewsletterSubscriptionStatus = "pending" | "active" | "unsubscribed";
export type NewsletterSubscriber = {
  id: string;
  email: string;
  status: NewsletterSubscriptionStatus;
  confirmation_token_hash: string | null;
  confirmation_expires_at: string | null;
  unsubscribe_token_hash: string;
  consented_at: string;
  consent_source: string;
  confirmed_at: string | null;
  unsubscribed_at: string | null;
  created_at: string;
  updated_at: string;
};
type NewsletterSubscriberInsert = Omit<NewsletterSubscriber, "id" | "created_at" | "updated_at">;
type NewsletterSubscriberUpdate = Partial<NewsletterSubscriberInsert>;

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
      blog_comments: {
        Row: BlogComment;
        Insert: BlogCommentInsert;
        Update: BlogCommentUpdate;
        Relationships: [
          {
            foreignKeyName: "blog_comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "blog_posts";
            referencedColumns: ["id"];
          },
        ];
      };
      newsletter_subscribers: {
        Row: NewsletterSubscriber;
        Insert: NewsletterSubscriberInsert;
        Update: NewsletterSubscriberUpdate;
        Relationships: [];
      };
      public_rate_limit_events: {
        Row: { id: number; scope: string; key_hash: string; created_at: string };
        Insert: { id?: number; scope: string; key_hash: string; created_at?: string };
        Update: Partial<{ scope: string; key_hash: string; created_at: string }>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      save_blog_post: {
        Args: { p_post: Json; p_citations: Json };
        Returns: { id: string; slug: string }[];
      };
      consume_public_rate_limit: {
        Args: {
          p_scope: string;
          p_key_hash: string;
          p_max_requests: number;
          p_window_seconds: number;
        };
        Returns: boolean;
      };
      submit_blog_comment: {
        Args: { p_post_slug: string; p_author_name: string; p_body: string; p_ip_hash: string };
        Returns: { id: string; created_at: string }[];
      };
    };
    Enums: {
      blog_post_status: BlogStatus;
      blog_comment_status: BlogCommentStatus;
      newsletter_subscription_status: NewsletterSubscriptionStatus;
    };
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
