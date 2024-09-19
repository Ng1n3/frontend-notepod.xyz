export const formatDate = (date: Date | string | null | undefined) => {
  if (!date) return 'Unknown date'; // Handle undefined or null

  const formattedDate = typeof date === 'string' ? new Date(date) : date; // Convert string to Date if necessary

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(formattedDate);
};