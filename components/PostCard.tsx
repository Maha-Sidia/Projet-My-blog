import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  slug: string;
  title: string;
  image?: string;
  author?: string;
  categories?: string[];
  tags?: string[];
  date?: string;
}

export default function PostCard({
  slug,
  title,
  image,
  author,
  categories = [],
  tags = [],
  date,
}: PostCardProps) {
  return (
    <Link
      href={`/post/${slug}`}
      className="group block rounded-3xl overflow-hidden border border-[var(--border)] bg-[color-mix(in srgb, var(--bg) 85%, var(--accent))]/5 backdrop-blur-md shadow-sm hover:shadow-[0_0_25px_-5px_var(--accent)] hover:-translate-y-2 transition-all duration-500"
    >
      <div className="relative w-full h-56 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-[var(--border)]" />
        )}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold text-[var(--text)]">{title}</h3>
        <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-[var(--muted)]">
          {author && <span>{author}</span>}
          {categories.length > 0 && <span>{categories.join(", ")}</span>}
          {tags.length > 0 && <span>{tags.join(", ")}</span>}
          {date && <span>{new Date(date).toLocaleDateString()}</span>}
        </div>
      </div>
    </Link>
  );
}
