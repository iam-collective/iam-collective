export const truncateText = (text: string, max = 100) => {
  if (!text) return "";
  return text.length > max ? text.substring(0, max) + "…" : text;
};
