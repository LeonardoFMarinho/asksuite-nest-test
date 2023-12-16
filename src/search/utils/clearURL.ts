export const clearUrl = (url: string): string => {
  const regex = /https(.*?\.jpg)/;
  const match = url.match(regex);
  return match[0];
};
