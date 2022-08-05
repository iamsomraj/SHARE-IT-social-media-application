export const getTime = (time) => {
  const date = new Date(time);
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let seconds = Math.floor(diff / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  let months = Math.floor(days / 30);
  let years = Math.floor(months / 12);
  if (seconds < 60) {
    return seconds > 1 ? `${seconds} seconds ago` : 'a few seconds ago';
  } else if (minutes < 60) {
    return minutes > 1 ? `${minutes} minutes ago` : 'a few minutes ago';
  } else if (hours < 24) {
    return hours > 1 ? `${hours} hours ago` : 'an hour ago';
  } else if (days < 30) {
    return days > 1 ? `${days} days ago` : 'a day ago';
  } else if (months < 12) {
    return months > 1 ? `${months} months ago` : 'a month ago';
  } else {
    return years > 1 ? `${years} years ago` : 'a year ago';
  }
};
