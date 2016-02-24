import React from 'react';
import PageNavigator from '../components/PageNavigator';
import ErrorMessage from '../components/ErrorMessage';

const ErrorPage = () =>
  <div className="app">
    <PageNavigator />
    <div className="content">
      <ErrorMessage
        message="No page found."
      />
    </div>
  </div>;

export default ErrorPage;
