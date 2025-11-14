export const generateExpiresAt = (added_hours: number) => {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + added_hours * 60 * 60 * 1000);

  const formatted = expiresAt.toISOString().slice(0, 19).replace("T", " ");
  return formatted;
};
