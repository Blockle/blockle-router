export function cleanupPath(path: string): string {
  return path.replace(/\/+/g, '/').replace(/\/$/, '');
}
