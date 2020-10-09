import React from 'react'
import noop from 'lodash/noop'
import cn from 'classnames'
import style from './style.module.scss'

interface ButtonProps {
  onClick?: () => void
  disabled?: boolean
  type?: string // TODO enum
  className?: string
}

export function Button({
  children,
  onClick,
  disabled,
  type = 'primary',
  className,
  ...rest
}: React.PropsWithChildren<ButtonProps>): JSX.Element {
  const handleClick = disabled ? noop : onClick

  return (
    <button
      type="button"
      className={cn(
        style.button,
        {
          [style.disabled]: disabled,
          [style.typePrimary]: type === 'primary',
          [style.typeSecondary]: type === 'secondary',
          [style.typeSecondaryInverted]: type === 'secondary-inverted'
        },
        className
      )}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  )
}
