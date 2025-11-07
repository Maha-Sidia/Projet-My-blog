import { notFound } from "next/navigation";
import { fetchPostBySlug } from "@/lib/fetchPostBySlug";
import Image from "next/image";
import { Post } from "@/types/post";
import { Metadata } from 'next';



interface PostPageProps {
  params: { slug: string } | Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post: Post | null = await fetchPostBySlug(slug);

  if (!post) {
    return {
      title: "post non trouvé",
      description: "Cet article n'existe pas ou a été supprimé.",
    };
  }

  const imageUrl = post.cover
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${post.cover.url}`
    : `${process.env.NEXT_PUBLIC_SITE_URL}/bg-blog-img.png`; 

  return {
    title: post.title,
    description: post.content?.slice(0, 150) + "...",
    openGraph: {
      title: post.title,
      description: post.content?.slice(0, 150) + "...",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${slug}`,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.content?.slice(0, 150) + "...",
      images: [imageUrl],
    },
  };
}





export default async function PostPage({ params }: PostPageProps) {
  
  const { slug } = await params;

  const post: Post | null = await fetchPostBySlug(slug);

  if (!post) {
    return notFound(); 
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
