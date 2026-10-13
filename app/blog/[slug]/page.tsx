import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE } from "@/site.config";
import { formatDate, getPost, getPosts } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return (
    <article className="wrap narrow">
      <header className="post-header">
        <div className="pills">
          {post.tags.map((t) => (
            <Link className="pill" key={t} href={`/tags/${t}/`}>
              {t}
            </Link>
          ))}
        </div>
        <h1>{post.title}</h1>
        <time className="meta" dateTime={post.date.toISOString()}>
          {formatDate(post.date, SITE.lang)}
        </time>
      </header>
      {post.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="post-cover" src={post.coverImage} alt="" />
      )}
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
