import { ErrorBoundary } from '@sentry/react';
import { Suspense } from 'react';
import Error from '../components/Error';
import Loading from '../components/Loading';
import ModelDetails from '../components/ModelDetails';

function Model() {
  return (
    <div className="container px-6 py-8">
      <h3 className="text-3xl font-medium text-gray-700 mb-8">Foundation Model Details</h3>
        <Suspense fallback={<Loading />}>
          <ErrorBoundary fallback={<Error errorMsg="The call for the model details failed!" />}>
            <ModelDetails />
          </ErrorBoundary>
        </Suspense>
    </div>
  )
}

export default Model;
