import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../utils/useFetch'
import SpinnerComponent from '../../components/spinner/SpinnerComponent';
import { getLoadByID } from '../../api/loadsApi'

const LoadItemPage = () => {
  const { id } = useParams();
  const { data, isLoaded, error, setTrigger} = useFetch(() => getLoadByID(id))

  useEffect(() => {
    setTrigger(true)
  }, [])

  if(error) {
    return <h2 className="text-center text-danger">{error}</h2>
  }
  
  if(!isLoaded) {
    return <SpinnerComponent />
  }

  const {load} = data
  
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2 className='text-center h1'>Load</h2>
          <h4><span className="text-muted">NAME:</span> {load.name}</h4>
          <h4><span className="text-muted">STATUS:</span> {load.status}</h4>
          <hr className='bg-light'/>
          <h4><span className="text-muted">DIMENSIONS:</span></h4>
          <h5><code>{JSON.stringify(load.dimensions)}</code></h5>
          <hr className='bg-light'/>
          <h4><span className="text-muted">LOGS:</span></h4>
          <h5><code>{JSON.stringify(load.logs)}</code></h5>
        </div>
      </div>
    </div>
  );
};

export default LoadItemPage;
