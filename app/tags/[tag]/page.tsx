import { Card } from "@/components/card";
import { getPosts } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...new Set(getPosts().flatMap((p) => p.tags))].map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  return { title: `#${decodeURIComponent((await params).tag)}` };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const tag = decodeURIComponent((await params).tag);
  const posts = getPosts().filter((p) => p.tags.includes(tag));
  return (
    <section className="wrap">
      <header className="post-header">
        <h1>#{tag}</h1>
      </header>
      <div className="cards">
        {posts.map((post) => (
          <Card key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
