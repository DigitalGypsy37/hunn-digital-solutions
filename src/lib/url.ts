const base = import.meta.env.BASE_URL;

/**
 * Prefix an internal absolute path ("/services") with the configured base path
 * so links resolve under a GitHub Pages subpath. External URLs, anchors ("#"),
 * and mailto: links pass through unchanged.
 */
export function withBase(path: string): string {
  if (!path.startsWith("/")) return path;
  return base.replace(/\/$/, "") + path;
}
