import { Post } from "@/types/post";

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts?filters[slug][$eq]=${encodeURIComponent(
        slug,
      )}&populate=*`,
      { next: { revalidate: 60 } },
    );

    const json = await res.json();

    if (!res.ok || !json.data || json.data.length === 0) {
      return null;
    }

    return json.data[0];
  } catch (err) {
    console.error("Fetch post error:", err);
    return null;
  }
}
