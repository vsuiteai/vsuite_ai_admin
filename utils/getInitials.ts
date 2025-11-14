const getInitials = (firstname?: string, lastname?: string): string => {
  const first = firstname?.trim() || "";
  const last = lastname?.trim() || "";

  if (first && last) {
    return (first[0] + last[0]).toUpperCase();
  }

  if (first) {
    return first.substring(0, 2).toUpperCase();
  }

  if (last) {
    return last.substring(0, 2).toUpperCase();
  }

  return "";
};

export { getInitials };
