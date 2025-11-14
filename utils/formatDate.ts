export const formatDate = (isoString: string) => {
  if (!isoString) return "---";
  const date = new Date(isoString);

  const day = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Get ordinal suffix
  const ordinal = (n: number) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Format hours to 12-hour format
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 becomes 12

  const paddedMinutes = minutes.toString().padStart(2, "0");

  return `${day}${ordinal(
    day
  )} ${month}, ${year} | ${hours}:${paddedMinutes}${ampm}`;
};
