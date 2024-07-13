export function stripUrl(url: string): string {
  const res = /\/static\/thumbs\/(.*)/.exec(url);

  return res?.[1] || "";
}
