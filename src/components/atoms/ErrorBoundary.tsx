import { Component, type ReactNode, type ErrorInfo } from 'react'
import { Button, Card, CardContent } from '@heroui/react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary]', error.message, errorInfo.componentStack)
    this.props.onError?.(error, errorInfo)
  }

  handleReset = () => this.setState({ hasError: false, error: null })

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="min-h-screen grid place-items-center bg-navy-900 p-4">
          <Card className="max-w-md w-full bg-navy-800/60 border border-navy-600/30 backdrop-blur-xl">
            <CardContent className="p-8 sm:p-10 text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-red-400"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-heading font-bold text-gold-400 tracking-wide">
                  Algo salió mal
                </h1>
                <p className="text-slate-400 text-sm font-heading tracking-wide leading-relaxed">
                  Ocurrió un error inesperado. Puedes intentar de nuevo o volver al inicio.
                </p>
              </div>

              {this.state.error && (
                <details className="text-left group">
                  <summary className="text-xs text-slate-600 hover:text-slate-400 cursor-pointer font-heading tracking-wide transition-colors select-none">
                    Detalles del error
                  </summary>
                  <pre className="mt-2 p-3 rounded-lg bg-navy-900/60 text-slate-500 text-xs font-mono overflow-auto max-h-32 leading-relaxed">
                    {this.state.error.message}
                  </pre>
                </details>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onPress={this.handleReset}
                  variant="secondary"
                  className="bg-gold-400/10 text-gold-400 hover:bg-gold-400/20 border-none font-heading tracking-wide"
                >
                  Reintentar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
