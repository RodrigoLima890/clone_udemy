import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formatar preço padrão americano
export const formatPrice = (price:number) => {
  return new Intl.NumberFormat('en-US', 
    {
      style: 'currency',
      currency: 'USD'
    }
  ).format(price)
}
