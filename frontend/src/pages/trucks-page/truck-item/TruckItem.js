import React from 'react';
import AssignTruck from '../assign-truck/AssignTruck'
import DeleteTruck from '../delete-truck/DeleteTruck'

const TruckItem = ({ item, i, setTrigger }) => {
  const styleStatus = item.assigned_to ? 'bg-light-green' : i % 2 === 0 ? 'bg-sec-custom1' : 'bg-sec-custom2'
  return (
    <div className={`row ${styleStatus} `}>
      <div className='col-12 col-md-1 align-items-center border-right py-2 border-bottom justify-content-center d-none d-md-flex'>
        <div>{i+1}</div>
      </div>
      <div className='col-6 col-md-4 d-flex align-items-center border-right py-2 border-bottom justify-content-center justify-content-md-start'>
        <div>{item.type}</div>
      </div>
      <div className='col-6 col-md-3 d-flex align-items-center border-right py-2 border-bottom justify-content-center'>
        <div>{!item.status ? 'Not in service' : item.status}</div>
      </div>
      <div className='col-6 col-md-2 d-flex align-items-center border-right py-2 border-bottom justify-content-center'>
        <div>{item.assigned_to ? 'TRUE' : 'FALSE'}</div>
      </div>
      <div className='col-6 col-md-2 d-flex align-items-center border-right py-2 border-bottom justify-content-center'>
        <AssignTruck item={item} setTrigger={setTrigger}/>
        <DeleteTruck item={item} setTrigger={setTrigger}/>
      </div>
    </div>
  );
};

export default TruckItem;
