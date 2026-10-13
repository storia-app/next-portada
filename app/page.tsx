import { Card } from "@/components/card";
import { SITE } from "@/site.config";
import { getPosts } from "@/lib/posts";

export default function Home() {
  const posts = getPosts();
  return (
    <>
      <section className="hero wrap">
        <h1>{SITE.title}</h1>
        <p>{SITE.description}</p>
      </section>
      <section className="wrap">
        <h2 className="section-title">Últimos artículos</h2>
        <div className="cards">
          {posts.map((post) => (
            <Card key={post.slug} post={post} />
          ))}
        </div>
        {posts.length === 0 && <p>Todavía no hay artículos.</p>}
      </section>
    </>
  );
}
