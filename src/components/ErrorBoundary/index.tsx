import React, { Component, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { recordError } from '@app/core';
import { ErrorText } from '../ErrorText';

interface State {
  hasError: boolean;
}

const ErrorMessage = (): JSX.Element => {
  const { t } = useTranslation();
  return <ErrorText>{t('error.somethingWentWrong')}</ErrorText>;
};

export class ErrorBoundary extends Component<{}, State> {
  private constructor(props: {}) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
    };
  }

  public componentDidCatch(error: Error): void {
    recordError(error);
  }

  public render(): ReactNode | JSX.Element {
    if (this.state.hasError) {
      return <ErrorMessage />;
    }

    return this.props.children;
  }
}
