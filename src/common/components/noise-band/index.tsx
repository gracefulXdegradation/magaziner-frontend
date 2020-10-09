import React from 'react'
import cn from 'classnames'
import style from './style.module.scss'

export function NoiseBand({
  children,
  className
}: React.PropsWithChildren<{
  className?: string
}>): JSX.Element {
  return <div className={cn(style.noiseBand, className)}>{children}</div>
}
