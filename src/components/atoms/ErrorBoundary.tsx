import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  handleReset = () => this.setState({ hasError: false, error: null })

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="min-h-screen grid place-items-center bg-slate-900 p-4">
          <div className="text-center space-y-4 max-w-md">
            <div className="text-6xl">⚠️</div>
            <h1 className="text-2xl font-bold text-white">Algo salió mal</h1>
            <p className="text-gray-400 text-sm">
              {this.state.error?.message ?? 'Error inesperado'}
            </p>
            <button
              onClick={this.handleReset}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Reintentar
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
