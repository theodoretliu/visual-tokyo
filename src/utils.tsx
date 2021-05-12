export function stripUrl(url: string): string {
  const res = /\/static\/media\/(shufu\.(\d+|\d+\.\d+))\.[\d\w]+\.jpg/.exec(
    url
  );

  return res?.[1] || "";
}
