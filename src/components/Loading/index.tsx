import { cn } from '@/lib/utils'

type LoadingProps = {
  className?: string
}
export function Loading({ className }: LoadingProps) {
  return (
    <div
      className={cn(
        'size-10 animate-spin rounded-full border-t border-slate-400',
        className,
      )}
    />
  )
}
