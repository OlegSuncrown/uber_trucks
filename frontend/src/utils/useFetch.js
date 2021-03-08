import React, { useState, useEffect } from 'react';

const useFetch = (api) => {
  const [data, setData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(false);

  const fetchData = async (api) => {
    setData(null);
    setError(null);
    setIsLoaded(false);
    try {
      const { data } = await api();
      setData(data);
      setIsLoaded(true);
    } catch (err) {
      setError(err.message);
      setIsLoaded(true);
    } finally {
      setTrigger(false)
    }
  };

  useEffect(() => {
    if (trigger) {
      fetchData(api);
    }
  }, [trigger]);

  return { data, isLoaded, error, setTrigger, fetchData };
};

export default useFetch;
