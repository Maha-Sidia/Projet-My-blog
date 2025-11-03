import { fetchPostsByCategory } from "@/lib/fetchPostsByCategory";
import PostList from "@/components/PostList";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: { slug: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const posts = await fetchPostsByCategory(params.slug);

  if (!posts || posts.length === 0) {
    return notFound();
  }

  return (
    <section className="py-12">
      <h1 className="text-3xl font-bold mb-8">Category: {params.slug}</h1>
      <PostList posts={posts} />
    </section>
  );
}
