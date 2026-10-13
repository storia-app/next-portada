import Link from "next/link";
import { SITE } from "@/site.config";
import { formatDate, type Post } from "@/lib/posts";

export function Card({ post }: { post: Post }) {
  return (
    <Link className="card" href={`/blog/${post.slug}/`}>
      {post.coverImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="card-cover" src={post.coverImage} alt="" loading="lazy" />
      ) : (
        <div className="card-cover" aria-hidden="true" />
      )}
      <div className="card-body">
        <time dateTime={post.date.toISOString()}>{formatDate(post.date, SITE.lang)}</time>
        <h2>{post.title}</h2>
        {post.excerpt && <p>{post.excerpt}</p>}
        {post.tags.length > 0 && (
          <div className="pills">
            {post.tags.slice(0, 3).map((t) => (
              <span className="pill" key={t}>
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
