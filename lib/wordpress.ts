import { BlogPost, Category } from '../types';

const WORDPRESS_API_URL = 'https://aliceblue-weasel-210326.hostingersite.com/wp-json/wp/v2';

export async function fetchBlogPosts(limit: number = 100): Promise<BlogPost[]> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/posts?_embed&per_page=${limit}`);
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.statusText}`);
    }
    const posts: BlogPost[] = await response.json();
    return posts;
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return []; // Return empty array on error
  }
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/posts?slug=${slug}&_embed`);
     if (!response.ok) {
      throw new Error(`WordPress API error: ${response.statusText}`);
    }
    const posts: BlogPost[] = await response.json();
    if (posts.length > 0) {
      return posts[0];
    }
    return null;
  } catch (error) {
     console.error(`Failed to fetch blog post with slug ${slug}:`, error);
     return null;
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/categories?_fields=id,name,slug,link&per_page=100`);
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.statusText}`);
    }
    const categories: Category[] = await response.json();
    // Filter out the default "Uncategorized" category
    return categories.filter(cat => cat.slug !== 'uncategorized');
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/categories?slug=${slug}&_fields=id,name,slug`);
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.statusText}`);
    }
    const categories: Category[] = await response.json();
    return categories[0] || null;
  } catch (error) {
    console.error(`Failed to fetch category with slug ${slug}:`, error);
    return null;
  }
}

export async function fetchPostsByCategoryId(categoryId: number): Promise<BlogPost[]> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/posts?categories=${categoryId}&_embed&per_page=100`);
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.statusText}`);
    }
    const posts: BlogPost[] = await response.json();
    return posts;
  } catch (error) {
    console.error(`Failed to fetch posts for category ${categoryId}:`, error);
    return [];
  }
}