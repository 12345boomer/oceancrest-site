import type { NextConfig } from "next";

// Old static URLs (page.html) keep working: each redirects to its new route.
const pages = ["transformation", "education", "courses", "diagnostic", "book", "about", "resources"];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/course.html", has: [{ type: "query", key: "id", value: "(?<id>.+)" }], destination: "/courses/:id", permanent: true },
      { source: "/course.html", destination: "/courses", permanent: true },
      ...pages.map((p) => ({ source: `/${p}.html`, destination: `/${p}`, permanent: true }))
    ];
  }
};

export default nextConfig;
