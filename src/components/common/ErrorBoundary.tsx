import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('SPINFORM Caught Component Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div
          style={{
            padding: '24px',
            backgroundColor: '#16171A',
            color: '#F1EFE9',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            border: '1px solid var(--studio-border)',
            textAlign: 'center'
          }}
        >
          <div style={{ color: 'var(--acid)', fontWeight: 700, marginBottom: '6px' }}>
            VIEWPORT INITIALIZED IN RESILIENT MODE
          </div>
          <div style={{ color: 'var(--studio-muted)' }}>
            Render fallback engaged. Interactive controls remain functional.
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
