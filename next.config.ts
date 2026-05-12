import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com", pathname: "/**" },
      { protocol: "https", hostname: "github.githubassets.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.creazilla.com", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/discord",
        destination: "https://discord.gg/JFTMjG5vvp",
        permanent: false,
      },
      {
        source: "/talvy",
        destination:
          "https://talvy.com/groups/join/019e1d02-1d5a-7f33-b445-4c45b851c67a",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
