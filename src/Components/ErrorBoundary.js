import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p>Ooops, something went wrong.</p>;
    }

    return this.props.children;
  }
}
