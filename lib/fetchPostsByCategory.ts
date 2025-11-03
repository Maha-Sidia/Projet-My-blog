import { Post } from "@/types/post";

export async function fetchPostsByCategory(slug: string): Promise<Post[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts?filters[categories][slug][$eq]=${encodeURIComponent(
        slug,
      )}&populate=author,categories,tags,cover&sort=publishedAt:desc`,
      { next: { revalidate: 60 } },
    );

    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error("Fetch posts by category error:", err);
    return [];
  }
}
