export function stripUrl(url) {
  let res = /\/static\/media\/(shufu\.(\d+|\d+\.\d+))\.[\d\w]+\.jpg/.exec(url);
  return res[1];
}
