import fs from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

/** Storia writes each article to posts/<slug>.md (see storia.json). */
const POSTS_DIR = path.join(process.cwd(), "posts");

export type Post = {
  slug: string;
  title: string;
  date: Date;
  excerpt: string;
  tags: string[];
  coverImage?: string;
  html: string;
};

/** Splits `---\n<yaml>\n---` from the Markdown body. */
function matter(raw: string): { data: Record<string, unknown>; content: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, content: raw };
  return { data: (parseYaml(m[1]) as Record<string, unknown>) ?? {}, content: m[2] };
}

function read(file: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const html = String(
    unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeHighlight, { detect: false })
      .use(rehypeStringify)
      .processSync(content),
  );
  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title ?? "Sin título"),
    date: new Date(String(data.date ?? new Date().toISOString())),
    excerpt: String(data.excerpt ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    html,
  };
}

/** Every post, newest first. */
export function getPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(read)
    .sort((a, b) => b.date.valueOf() - a.date.valueOf());
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function formatDate(date: Date, lang: string): string {
  return date.toLocaleDateString(lang, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
