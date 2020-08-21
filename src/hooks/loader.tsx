import React, { createContext, useCallback, useContext, useState } from 'react';

import LoaderContainer from '../components/Loader';

interface LoaderContextData {
  enableLoader(): void;
  disableLoader(): void;
  isLoading: boolean;
}

const LoaderContext = createContext<LoaderContextData>({} as LoaderContextData);

const LoaderProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const enableLoader = useCallback(() => {
    setIsLoading(true);
  }, []);

  const disableLoader = useCallback(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <LoaderContext.Provider value={{ enableLoader, disableLoader, isLoading }}>
      {isLoading && <LoaderContainer />}
      {children}
    </LoaderContext.Provider>
  );
};

function useLoader(): LoaderContextData {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }

  return context;
}

export { LoaderProvider, useLoader };
