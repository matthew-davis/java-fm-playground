import { ErrorBoundary } from '@sentry/react';
import { Suspense } from 'react';
import Error from '../components/Error';
import Loading from '../components/Loading';
import ModelList from '../components/ModelList';

function Models() {
  return (
    <div className="container px-6 py-8">
      <h3 className="text-3xl font-medium text-gray-700 mb-8">Foundation Models</h3>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<Error errorMsg="The call for the model lists failed!" />}>
          <ModelList />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}

export default Models;
