// Thanks https://jvilk.com/MakeTypes/ !

export interface Post {
    id: string;
    uuid: string;
    title: string;
    slug: string;
    html: string;
    comment_id: string;
    feature_image: string;
    featured: boolean;
    visibility: string;
    created_at: string;
    updated_at: string;
    published_at: string;
    custom_excerpt: string;
    codeinjection_head?: null;
    codeinjection_foot?: null;
    custom_template?: null;
    canonical_url?: null;
    tags: (TagsEntity)[] | null;
    authors?: (AuthorsEntityOrPrimaryAuthor)[] | null;
    primary_author: AuthorsEntityOrPrimaryAuthor;
    primary_tag?: null;
    url: string;
    excerpt: string;
    reading_time: number;
    access: boolean;
    comments: boolean;
    og_image?: null;
    og_title?: null;
    og_description?: null;
    twitter_image?: null;
    twitter_title?: null;
    twitter_description?: null;
    meta_title?: null;
    meta_description?: null;
    email_subject?: null;
    frontmatter?: null;
    feature_image_alt?: null;
    feature_image_caption: string;

    // Custom
    metadata?: PostMetadata;
  }
  export interface TagsEntity {
    id: string;
    name: string;
    slug: string;
    description?: null;
    feature_image?: null;
    visibility: string;
    og_image?: null;
    og_title?: null;
    og_description?: null;
    twitter_image?: null;
    twitter_title?: null;
    twitter_description?: null;
    meta_title?: null;
    meta_description?: null;
    codeinjection_head?: null;
    codeinjection_foot?: null;
    canonical_url?: null;
    accent_color?: null;
    url: string;
  }
  export interface AuthorsEntityOrPrimaryAuthor {
    id: string;
    name: string;
    slug: string;
    profile_image?: null;
    cover_image?: null;
    bio?: null;
    website: string;
    location?: null;
    facebook?: null;
    twitter: string;
    meta_title?: null;
    meta_description?: null;
    url: string;
  }
  
  export interface PostMetadata {
    // This is manually typed into the post's excerpt field.
    repo?: string;  // Repository URL
    live?: string;  // Live website URL
    post?: string;  // Full blog-post URL
  }