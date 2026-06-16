import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const githubPagesBasePath = "/HarmonyHill";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubActions ? githubPagesBasePath : undefined,
  assetPrefix: isGithubActions ? githubPagesBasePath : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
