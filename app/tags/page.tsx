import Link from "next/link";
import { getPosts } from "@/lib/posts";

export const metadata = { title: "Tags" };

export default function TagsPage() {
  const counts = new Map<string, number>();
  for (const p of getPosts()) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  const tags = [...counts].sort((a, b) => b[1] - a[1]);
  return (
    <section className="wrap narrow post-header">
      <h1>Tags</h1>
      <ul className="tag-list">
        {tags.map(([t, n]) => (
          <li key={t}>
            <Link className="pill" href={`/tags/${t}/`}>
              {t} · {n}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
