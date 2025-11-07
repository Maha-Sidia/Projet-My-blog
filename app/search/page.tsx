import SearchForm from "../../components/SearchForm";
import SearchResults from "../../components/SearchResults";

type Props = { searchParams?: { q?: string; category?: string; tag?: string } };

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams; 
  const query = params?.q || "";
  const category = params?.category || "";
  const tag = params?.tag || "";

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Search Posts</h1>
      <SearchForm
        initialQuery={query}
        initialCategory={category}
        initialTag={tag}
      />
      <SearchResults query={query} category={category} tag={tag} />
    </main>
  );
}
