/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
        return  [
            {
              source: "/api/:path*",
              destination:
                process.env.NODE_ENV === "development"
                  ? "http://127.0.0.1:8000/:path*"
                  : "/api/",
            },
            {
              source: "/docs/:path*",
              destination:
                process.env.NODE_ENV === "development"
                  ? "http://127.0.0.1:8000/docs/:path*"
                  : "/docs/"
            }
          ];
    }
};

export default nextConfig;
