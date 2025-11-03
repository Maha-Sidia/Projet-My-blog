import { Post } from "../types/post";

export async function fetchLatestPosts(): Promise<Post[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts?pagination[limit]=3&sort=publishedAt:desc
      &populate[author][fields]=name
      &populate[categories][fields]=name
      &populate[tags][fields]=name
      &populate[cover][fields]=url`,
    );

    const json = await res.json();

    if (!res.ok || json.error) {
      console.error("Strapi fetch error:", json.error);
      return [];
    }

    return json.data || [];
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}
