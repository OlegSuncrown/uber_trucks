import React, { createContext } from 'react';
import { getLoadsApi } from '../../api/loadsApi';
import useFetch from '../../utils/useFetch';
export const LoadsContext = createContext();

const LoadsState = (props) => {
  const { data, isLoaded, setTrigger, error, fetchData } = useFetch(() => getLoadsApi());

  return (
    <LoadsContext.Provider
      value={{
        data,
        isLoaded,
        setTrigger,
        error,
        fetchData
      }}
    >
      {props.children}
    </LoadsContext.Provider>
  );
};

export default LoadsState;
