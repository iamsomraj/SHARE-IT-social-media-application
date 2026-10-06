const getShortTimeFormat = (
  seconds: number,
  minutes: number,
  hours: number,
  days: number,
  months: number,
  years: number
): string => {
  if (seconds < 60) {
    const rounded = Math.floor(seconds / 10) * 10
    return rounded === 0 ? '10 s' : `${Math.min(rounded, 50)} s`
  }
  if (minutes < 60) return `${minutes} m`
  if (hours < 24) return `${hours} h`
  if (days < 30) return `${days} d`
  if (months < 12) return `${months} mo`
  return `${years} y`
}

export const getTime = (time: string | Date, short = false): string => {
  const date = new Date(time)
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  if (short) {
    return getShortTimeFormat(seconds, minutes, hours, days, months, years)
  }

  if (seconds < 60) {
    return seconds > 1 ? `${seconds} seconds ago` : 'a few seconds ago'
  } else if (minutes < 60) {
    return minutes > 1 ? `${minutes} minutes ago` : 'a few minutes ago'
  } else if (hours < 24) {
    return hours > 1 ? `${hours} hours ago` : 'an hour ago'
  } else if (days < 30) {
    return days > 1 ? `${days} days ago` : 'a day ago'
  } else if (months < 12) {
    return months > 1 ? `${months} months ago` : 'a month ago'
  } else {
    return years > 1 ? `${years} years ago` : 'a year ago'
  }
}
