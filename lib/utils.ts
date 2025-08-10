import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(date: Date|string): string {
  const now = new Date();
  date = new Date(date)
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours   = Math.floor(diff / (1000 * 60 * 60));
  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (seconds < 60) return rtf.format(-seconds, 'second');
  if (minutes < 60) return rtf.format(-minutes, 'minute');
  if (hours   < 24) return rtf.format(-hours, 'hour');
  return rtf.format(-days, 'day');
}

export function timeFormat(date:Date|string):string{


  return format(date, 'HH:mm a')
}
