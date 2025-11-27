export function formatDateTime(iso: string) {
  return iso.replace("T", " ").slice(0, 16);
}
