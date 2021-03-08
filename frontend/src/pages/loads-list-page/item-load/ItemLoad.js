import DeleteLoad from '../delete-load/DeleteLoad';
import PostLoad from '../post-load/PostLoad';
import { Link } from 'react-router-dom';
import { GrNotes, GrDocument } from  "react-icons/gr";

const ItemLoad = ({ item, i, setTrigger }) => {
  const styleStatus = item.status === 'ASSIGNED' ? 'bg-light-orange'  : item.status === 'SHIPPED' ? 'bg-light-green' : i % 2 === 0 ? 'bg-sec-custom1' : 'bg-sec-custom2'
  return (
    <>
      <div className={`row ${styleStatus}`}>
        <div className='col-12 bg-light col-md-1 d-flex align-items-center justify-content-center border-right py-2 border-bottom text-break'>
          <div>{i + 1}</div>
        </div>
        <div className='col-6 col-md-3 d-flex align-items-center py-2 border-right border-bottom text-break'>
          <div>{item.name}</div>
        </div>
        <div className={`col-6 col-md-2 d-flex align-items-center py-2 border-right border-bottom`}>
          <div>{item.status}</div>
        </div>
        <div className='col-6 col-md-3 d-flex align-items-center py-2 border-right border-bottom text-break'>
          <div>{item.state ? item.state : 'No state yet'}</div>
        </div>
        <div className='col-6 col-md-3 d-flex align-items-center border-right border-bottom text-break justify-content-center'>
          {item.status === 'NEW' ? (
            <>
              <PostLoad item={item} setTrigger={setTrigger} />
            </>
          ) : (
            <Link className='h5 m-0 mr-1' to={`/dashboard/load/${item._id}/shipping_info`}>
              <GrNotes />
            </Link>
          )}
           <DeleteLoad item={item} setTrigger={setTrigger} />
          <Link className='h5 m-0 ml-1' to={`/dashboard/load/${item._id}`}>
            <GrDocument />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ItemLoad;
