export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          full_name: string | null;
          bio: string | null;
          avatar_url: string | null;
          role: "admin" | "member";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          full_name?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          role?: "admin" | "member";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string | null;
          full_name?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          role?: "admin" | "member";
          updated_at?: string;
        };
      };
      articles: {
        Row: {
          id: string;
          title: string;
          content: string;
          cover_image: string | null;
          slug: string;
          published: boolean;
          author_id: string;
          views: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          cover_image?: string | null;
          slug: string;
          published?: boolean;
          author_id: string;
          views?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          content?: string;
          cover_image?: string | null;
          slug?: string;
          published?: boolean;
          views?: number;
          updated_at?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          article_id: string;
          author_id: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          article_id: string;
          author_id: string;
          content: string;
          created_at?: string;
        };
        Update: {
          content?: string;
        };
      };
    };
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Article = Database["public"]["Tables"]["articles"]["Row"] & {
  profiles?: Profile;
};
export type Comment = Database["public"]["Tables"]["comments"]["Row"] & {
  profiles?: Profile;
};
