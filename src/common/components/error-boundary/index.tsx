import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
}

interface ErrorBoundaryProps {
  children: JSX.Element
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    this.setState({ hasError: true })
    console.error(error, info) // eslint-disable-line no-console
  }

  render(): JSX.Element {
    const { hasError } = this.state
    const { children } = this.props
    return hasError ? <h1>Something went wrong.</h1> : children
  }
}
