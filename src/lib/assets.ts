export function getAssetPath(path: string): string {
  if (!path || path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//') || path.startsWith('data:')) {
    return path;
  }
  const clean = path.startsWith('/') ? path : `/${path}`;

  // In the browser, detect whether the site is running under /LIEC-website or root (custom domain)
  if (typeof window !== 'undefined') {
    if (window.location.pathname.startsWith('/LIEC-website')) {
      if (!clean.startsWith('/LIEC-website')) {
        return `/LIEC-website${clean}`;
      }
      return clean;
    }
    // Custom domain: root relative
    return clean;
  }

  // During static SSR / Next.js build
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (base && !clean.startsWith(base)) {
    return `${base}${clean}`;
  }
  return clean;
}
