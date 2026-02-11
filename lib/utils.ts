import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency: string = "EUR", locale: string = "pt-PT"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(price)
}

export function formatDate(date: Date | string, locale: string = "pt-PT"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}
