export const generateChunks = (input: string): string[] | null => {
  try {
    return input
      .replace(/<[^>]*>/g, "") // remove all HTML tags
      .trim()
      .split(".")
      .filter((i) => i !== "");
  } catch (error) {
    return null;
  }
};
