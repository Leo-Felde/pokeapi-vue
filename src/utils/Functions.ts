export const getTypeUrl = (type: string) => {
  const url = new URL(`../assets/img/icon-${type}.png`, import.meta.url).href
  return url
}