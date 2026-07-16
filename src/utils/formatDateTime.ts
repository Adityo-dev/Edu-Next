export const FormatDateTime = (dateString: string | null | Date): string => {
  if (!dateString) return 'N/A';

  const date = new Date(dateString);

  // Date format: 17 Jan 2026
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  // Time format: 5:30pm
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat('en-GB', dateOptions).format(date);
  const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions)
    .format(date)
    .toLowerCase()
    .replace(/\s/g, '');

  return `${formattedDate}, ${formattedTime}`;
};

export const FormatDate = (dateString: string | null | Date): string => {
  if (!dateString) return 'N/A';

  const date = new Date(dateString);

  // Date format: 17 Jan 2026
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  return new Intl.DateTimeFormat('en-GB', dateOptions).format(date);
};

export const GetRelativeTime = (dateString: string | null | Date): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 30) return `${diffInDays} days ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} months ago`;
  return `${Math.floor(diffInMonths / 12)} years ago`;
};
