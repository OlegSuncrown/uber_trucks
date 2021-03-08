import React, { useContext } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { UserContext } from '../../context/user/UserContext';
import SideNav from '../../components/dashboard-side-menu/SideNav';
import { shipperRoutes } from '../../consts/shipperRoutes';
import { driverRoutes } from '../../consts/driverRoutes';
import UserProfilePage from '../user-profile-page/UserProfilePage';
import SpinnerComponent from '../../components/spinner/SpinnerComponent'

const DashboardPage = () => {
  const { user } = useContext(UserContext);
  const match = useRouteMatch();

  if (!user) {
    return <SpinnerComponent />
  }

  const routes = user.role === 'SHIPPER' ? [...shipperRoutes] : [...driverRoutes];
  
  return (
    <div className='container-xl h-100'>
      <div className='row h-100'>
        <div className='col-12 col-lg-3 h-100 d-none d-lg-block'>
          <SideNav />
        </div>
        <div className='col-12 col-lg-9'>
          <Switch>
            {routes.map((item, i) => {
              return (
                <Route key={i} exact={item.exact} path={item.path(match)}>
                  {item.component}
                </Route>
              );
            })}
            <Route path={`${match.path}/profile`}>
              <UserProfilePage />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
