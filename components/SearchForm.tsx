"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchForm({
  initialQuery = "",
  initialCategory = "",
  initialTag = "",
}: {
  initialQuery?: string;
  initialCategory?: string;
  initialTag?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [tag, setTag] = useState(initialTag);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category) params.set("category", category);
    if (tag) params.set("tag", tag);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded flex-1"
      />
      <input
        type="text"
        placeholder="Category slug"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Tag slug"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Search
      </button>
    </form>
  );
}
