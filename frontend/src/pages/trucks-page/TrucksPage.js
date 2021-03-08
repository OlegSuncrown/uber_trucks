import React, { useEffect } from 'react';
import useFetch from '../../utils/useFetch';
import { getTrucksApi } from '../../api/trucksApi';
import AlertComponent from '../../components/alert/AlertComponent'
import SpinnerComponent from '../../components/spinner/SpinnerComponent';
import TruckItem from './truck-item/TruckItem';
import AddTruck from './add-truck/AddTruck';

const TrucksPage = () => {
  const { data, isLoaded, setTrigger, error } = useFetch(() => getTrucksApi());

  useEffect(() => {
    setTrigger(true);
  }, []);

  if (error) {
    return <AlertComponent text={error}/>
  }
  
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12 p-0'>
          <AddTruck setTrigger={setTrigger} />
        </div>
        <div className='col-12 col-md-1 align-items-center border-right py-3 border-bottom justify-content-center d-none d-md-flex'>
          <div>#</div>
        </div>
        <div className='col-6 col-md-4 d-flex align-items-center border-right py-3 border-bottom justify-content-center'>
          <div>TYPE</div>
        </div>
        <div className='col-6 col-md-3 d-flex align-items-center border-right py-3 border-bottom justify-content-center'>
          <div>STATUS</div>
        </div>
        <div className='col-6 col-md-2 d-flex align-items-center border-right py-3 border-bottom justify-content-center'>
          <div>ASSIGNED</div>
        </div>
        <div className='col-6 col-md-2 d-flex align-items-center border-right py-3 border-bottom justify-content-center'>
          <div>ASSIGN/DELETE</div>
        </div>
      </div>
      {!isLoaded ? <SpinnerComponent /> :
        data.trucks.map((item, i) => {
          return <TruckItem key={item._id} item={item} i={i} setTrigger={setTrigger} />;
        })
      }
    </div>
  );
};

export default TrucksPage;
