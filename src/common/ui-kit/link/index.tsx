import React from 'react'
import { Link as ReactLink } from 'react-router-dom'

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
  className?: string
}

export function Link(props: LinkProps): JSX.Element {
  const { children, to, ...rest } = props
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ReactLink to={to} {...rest}>
      {children}
    </ReactLink>
  )
}
