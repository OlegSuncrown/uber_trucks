import CreateLoadPage from '../pages/create-load-page/CreateLoadPage';
import LoadsListPage from '../pages/loads-list-page/LoadsListPage';
import LoadItemPage from '../pages/load-item-page/LoadItemPage'
import ShippingInfoPage from '../pages/shipping-info-page/ShippingInfoPage'


export const shipperRoutes = [
  {
    path: (match) => match.path,
    exact: true,
    component: <LoadsListPage />
  },
  {
    path: (match) => `${match.path}/add-load`,
    exact: false,
    component: <CreateLoadPage />
  },
  {
    path: (match) => `${match.path}/load/:id`,
    exact: true,
    component: <LoadItemPage />
  },
  {
    path: (match) => `${match.path}/load/:id/shipping_info`,
    exact: true,
    component: <ShippingInfoPage  />
  },
]

export const shipperMenuRoutes = [
  {
    exact: true,
    path: (match) => match.url,
    name: 'My Loads'
  },
  {
    exact: false,
    path: (match) => `${match.url}/add-load`,
    name: 'Create load'
  },
  {
    exact: false,
    path: (match) => `${match.url}/profile`,
    name: 'Profile'
  }
];

