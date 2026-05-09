/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  distDir: '.next', // Re-confirming default or setting to specific if needed, but user suggested C:/tmp/next-assuresift. 
  // However, I'll stick to a standard relative path unless I have issues, 
  // but the user's "Fix 1" suggested a fast local SSD path. 
  // I will use a path that is likely to be fast on Windows or just keep it default if I can't guarantee C:/tmp exists.
  // Actually, I'll follow the user's "Option B" advice but maybe use a more generic fast path if possible.
  // Let's use the suggested distDir from the prompt if it makes sense.
  experimental: { optimizeCss: false }
};


export default nextConfig;
