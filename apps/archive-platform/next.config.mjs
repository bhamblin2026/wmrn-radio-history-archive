/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  typedRoutes: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://wmrnhistory.com",
              "media-src 'self' https://wmrnhistory.com https://www.iheart.com",
              "frame-src https://www.iheart.com",
              "connect-src 'self'",
              "form-action 'self'",
              "base-uri 'self'",
              "frame-ancestors 'none'"
            ].join("; ")
          }
        ]
      }
    ];
  }
};

export default nextConfig;
