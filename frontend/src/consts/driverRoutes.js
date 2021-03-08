import TrucksPage from '../pages/trucks-page/TrucksPage';

export const driverRoutes = [
  {
    path: (match) => `${match.path}`,
    exact: true,
    component: <TrucksPage />,
  },
];

export const driverMenuRoutes = [
  {
    exact: true,
    path: (match) => `${match.url}`,
    name: 'My Trucks',
  },
  {
    exact: false,
    path: (match) => `${match.url}/profile`,
    name: 'Profile',
  },
];
