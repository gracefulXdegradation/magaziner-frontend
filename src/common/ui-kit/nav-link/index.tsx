import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import style from './style.module.scss'

// TODO: sdelat normalno

interface NavLinkProps {
  icon: React.ReactNode
  external?: boolean
  to: string
  className: string
  active?: boolean
  onClick: () => void
}

export function NavLink({
  icon,
  external,
  children,
  to,
  className,
  active,
  ...rest
}: React.PropsWithChildren<NavLinkProps>): JSX.Element {
  const styles = cn(style.navLink, active && style.navLinkActive, className)
  return external ? (
    <a
      href={to}
      className={styles}
      {...rest}
      target="_blank"
      rel="noopener noreferrer"
    >
      <i>{icon}</i>
      {children}
    </a>
  ) : (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Link to={to} className={styles} {...rest}>
      <i>{icon}</i>
      {children}
    </Link>
  )
}
