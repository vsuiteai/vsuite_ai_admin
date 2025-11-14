export const parse_name = (
  raw_name: string,
  maxLength: number = 15,
  firstPart_characters_num: number = 7
) => {
  const filename = raw_name;

  if (!filename) return "";
  if (filename.length <= maxLength) return filename;

  const ext = filename.split(".").pop() ?? "";
  const nameWithoutExt = filename.slice(0, filename.length - ext.length - 1);

  const firstPart = nameWithoutExt.slice(0, firstPart_characters_num);
  const lastPart = nameWithoutExt.slice(-firstPart_characters_num);

  return `${firstPart}...${lastPart}.${ext}`;
};
