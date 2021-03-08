import React, { useEffect, useContext } from 'react';
import { LoadsContext } from '../../context/loads/LoadsContext';
import SpinnerComponent from '../../components/spinner/SpinnerComponent';
import ItemLoad from './item-load/ItemLoad';
import FilterLoads from './filter-loads/FilterLoads';
import AlertComponent from '../../components/alert/AlertComponent'

const LoadsListPage = () => {
  const { data, isLoaded, setTrigger, error, fetchData } = useContext(LoadsContext);

  useEffect(() => {
    setTrigger(true);
  }, []);

  if (error) {
    return <AlertComponent text={error}/>
  }
  
  return (
    <div className='container-fluid'>
      <div className='row font-weight-normal'>
        <div className='col-12 p-0'>
          <FilterLoads fetchData={fetchData} isLoaded={isLoaded}/>
        </div>
        <div className='col-12 col-md-1 align-items-center border-right py-3 border-bottom justify-content-center d-none d-md-flex'>
          <div>#</div>
        </div>
        <div className='col-6 col-md-3 d-flex align-items-center border-right py-3 border-bottom justify-content-center'>
          <div>LOAD NAME</div>
        </div>
        <div className='col-6 col-md-2 d-flex align-items-center border-right py-3 border-bottom justify-content-center'>
          <div>STATUS</div>
        </div>
        <div className='col-6 col-md-3 d-flex align-items-center border-right py-3 border-bottom justify-content-center'>
          <div>STATE</div>
        </div>
        <div className='col-6 col-md-3 d-flex align-items-center border-right py-3 border-bottom justify-content-center'>
          <div>POST/DELETE/INFO</div>
        </div>
      </div>
      {!isLoaded ? (
        <SpinnerComponent />
      ) : (
        data.loads.map((item, i) => {
          return <ItemLoad key={item._id} item={item} i={i} setTrigger={setTrigger} />;
        })
      )}
    </div>
  );
};

export default LoadsListPage;
