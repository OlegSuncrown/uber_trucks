import React, { useContext } from 'react';
import { UserContext } from '../../context/user/UserContext';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { shipperMenuRoutes } from '../../consts/shipperRoutes';
import { driverMenuRoutes } from '../../consts/driverRoutes';

const SideNav = () => {
  const { user } = useContext(UserContext);
  let match = useRouteMatch();

  const routes = user.role === 'SHIPPER' ? [...shipperMenuRoutes] : [...driverMenuRoutes];

  return (
    <ul className='list-group h-100 border-right pt-4'>
      {routes.map((route, i) => {
        return (
          <NavLink
            key={i}
            exact={route.exact}
            activeClassName='bg-sec-custom text-white'
            to={route.path(match)}
            className='list-group-item h5 m-0 list-group-item-action border-0 py-3'
          >
            {route.name}
          </NavLink>
        );
      })}
    </ul>
  );
};

export default SideNav;
