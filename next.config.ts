import type { NextConfig } from "next";

// Static export for GitHub Pages. The workflow passes the base path (empty
// for <usuario>.github.io, "/<repo>" for a project site), so the same code
// works as a main site or under a path.
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.BASE_PATH || "",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
