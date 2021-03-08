import React, { useContext } from 'react';
import { UserContext } from '../../context/user/UserContext';
import SpinnerComponent from '../../components/spinner/SpinnerComponent'
const UserProfilePage = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="container">
    <div className="row">
      <div className="col">
        <h2 className='text-center h1'>Profile Info</h2>
        {!user ? (
          <SpinnerComponent />
        ) : (
          <>
            <h4><span className="text-muted">NAME:</span> {user.username}</h4>
            <h4><span className="text-muted">EMAIL:</span> {user.email}</h4>
            <hr className='bg-light'/>
            <h4><span className="text-muted">ROLE:</span> {user.role}</h4>
          </>
        )}
      </div>
    </div>
  </div>
  )
}

export default UserProfilePage
