import PostCard from "./PostCard";
import { Post } from "@/types/post";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-[var(--text)]">
        📰 Latest Posts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            slug={post.slug}
            title={post.title}
            image={
              post.cover
                ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${post.cover.url}`
                : undefined
            }
            author={post.author?.name}
            categories={post.categories?.map((c) => c.name) || []}
            tags={post.tags?.map((t) => t.name) || []}
            date={post.publishedAt}
          />
        ))}
      </div>
    </section>
  );
}
