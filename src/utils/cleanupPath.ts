export function cleanupPath(path: string) {
  return path.replace(/\/+/g, '/').replace(/\/$/, '');
}
