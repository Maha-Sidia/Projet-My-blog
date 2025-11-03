import { notFound } from "next/navigation";
import { fetchPostBySlug } from "@/lib/fetchPostBySlug";
import Image from "next/image";
import { Post } from "@/types/post";

interface PostPageProps {
  params: { slug: string } | Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  // ⚡ Si params est une Promise, il faut l'awaiter
  const { slug } = await params;

  const post: Post | null = await fetchPostBySlug(slug);

  if (!post) {
    return notFound(); // renvoie 404 si post introuvable
  }

  return (
    <article className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      {post.cover && (
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.cover.url}`}
          alt={post.title}
          width={800}
          height={500}
          className="mb-6"
          unoptimized
        />
      )}
      <p className="text-gray-700">{post.content}</p>
    </article>
  );
}
