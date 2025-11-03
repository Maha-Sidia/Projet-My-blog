import Hero from "@/components/Hero";
import NewsletterForm from "@/components/NewsletterForm";
import PostList from "@/components/PostList";
import { fetchLatestPosts } from "@/lib/fetchLatestPosts";

export default async function Home() {
  const latestPosts = await fetchLatestPosts();

  return (
    <main>
      <Hero />
      <section className="py-12">
        <PostList posts={latestPosts} />
      </section>
      <section className="py-16">
        <NewsletterForm />
      </section>
    </main>
  );
}
