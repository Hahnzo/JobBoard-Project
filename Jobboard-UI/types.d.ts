declare module 'class-variance-authority' {
  export function cva(base: string, config: any): any
  export type VariantProps<T> = any
}

declare module '@/components/ui/badge' {
  import { HTMLAttributes } from 'react'
  export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  }
  export const Badge: React.FC<BadgeProps>
} 