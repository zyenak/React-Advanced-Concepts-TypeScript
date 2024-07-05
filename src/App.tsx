import React from 'react';
import CarouselContainer from './containers/carousel-container';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorBombFallback } from './components/error';

const App: React.FC = () => {
    return (
        <ErrorBoundary
            FallbackComponent={ErrorBombFallback}
        >
                <CarouselContainer />
        </ErrorBoundary>
    );
};

export default App;
