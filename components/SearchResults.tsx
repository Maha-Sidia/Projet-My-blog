import { z } from "zod";
import { Post } from "@/types/post";
import Image from "next/image";
import PostCard from "@/components/PostCard";
type Props = { query?: string; category?: string; tag?: string };

export default async function SearchResults({ query, category, tag }: Props) {
  if (!query && !category && !tag) return <p>Veuillez saisir une recherche.</p>;

  const filters = new URLSearchParams();

  if (query) filters.set("filters[title][$contains]", query);
  if (category) filters.set("filters[categories][slug][$eq]", category);
  if (tag) filters.set("filters[tags][slug][$eq]", tag);

  filters.set("populate", ["cover", "author", "categories", "tags"].join(","));

  filters.set("populate[categories][fields][0]", "name");
  filters.set("populate[categories][fields][1]", "slug");
  filters.set("populate[tags][fields][0]", "name");
  filters.set("populate[tags][fields][1]", "slug");

  filters.set("populate[cover][fields][0]", "name");
  filters.set("populate[cover][fields][1]", "url");
  filters.set("populate[cover][fields][2]", "alternativeText");
  filters.set("populate[cover][fields][3]", "formats");

  filters.set("populate[author][fields][0]", "name");

  const url = `http://localhost:1337/api/posts?${filters.toString()}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      let body = "";
      try {
        const text = await res.text();
        try {
          body = JSON.stringify(JSON.parse(text));
          console.log("[SearchResults] Fetch URL:", body);
        } catch {
          body = text;
        }
      } catch (er) {
        console.error(er);
        body = res.statusText || "";
      }
      console.error("[SearchResults] Error response body:", body);
      console.error(
        "[SearchResults] Response headers:",
        Array.from(res.headers.entries()),
      );
      throw new Error(
        `Failed to fetch posts from Strapi (status ${res.status})${body ? `: ${body}` : ""}`,
      );
    }

    const json = await res.json();

    if (!json || !Array.isArray(json.data)) {
      const body = JSON.stringify(json);
      console.error("[SearchResults] Unexpected response structure:", body);
      return (
        <p className="text-red-500">
          Erreur: réponse inattendue de Strapi: {body}
        </p>
      );
    }

    if (!json.data.length) return <p>Aucun post trouvé.</p>;

    return (
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8 text-[var(--text)]">
          Search Result
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <ul className="space-y-4">
            {json.data.map((postObj: Post) => {
              const attrs = postObj ?? {};
              console.log("Post attributes:", attrs);
              const title = attrs.title ?? "Sans titre";
              const slug = attrs.slug ?? "";
              const categoryName = (attrs.categories ?? [])
                .map((c: any) => c?.slug)
                .filter(Boolean);

              const tagsNames = (attrs.tags ?? [])
                .map((t: any) => t?.name)
                .filter(Boolean);

              const coverUrl = attrs.cover?.url
                ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${attrs.cover.url}`
                : undefined;
              return (
                <PostCard
                  key={postObj.id}
                  slug={slug}
                  title={title}
                  image={coverUrl}
                  author={attrs?.author?.name ?? undefined}
                  tags={tagsNames}
                  categories={categoryName}
                />
              );
            })}
          </ul>
        </div>
      </section>
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return <p className="text-red-500">Erreur: {message}</p>;
  }
}
