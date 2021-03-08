import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../utils/useFetch'
import SpinnerComponent from '../../components/spinner/SpinnerComponent';
import { getShippingInfo } from '../../api/loadsApi'

const ShippingInfoPage = () => {
  const { id } = useParams();
  const { data, isLoaded, error, setTrigger} = useFetch(() => getShippingInfo(id))

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
          <h2 className='text-center h1'>Shipping info page</h2>
          <h4><span className="text-muted">NAME:</span> {load.name}</h4>
          <h4><span className="text-muted">SHIPPING INFO:</span></h4>
          <h5><code>{JSON.stringify(load.truck)}</code></h5>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfoPage;
