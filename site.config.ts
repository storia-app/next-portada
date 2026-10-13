// Edit these to make the blog yours.
export const SITE = {
  title: "Mi blog",
  description: "Notas sobre lo que aprendo construyendo software.",
  author: "Tu nombre",
  lang: "es",
  /** Set by the workflow; used for absolute links (RSS, canonical). */
  url: (process.env.SITE_URL || "http://localhost:3000") + (process.env.BASE_PATH || ""),
  basePath: process.env.BASE_PATH || "",
};
