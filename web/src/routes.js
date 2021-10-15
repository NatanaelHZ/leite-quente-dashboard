import { Navigate } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import DashboardLayout from 'src/components/DashboardLayout';
// eslint-disable-next-line import/no-unresolved
import MainLayout from 'src/components/MainLayout';
// eslint-disable-next-line import/no-unresolved
import Account from 'src/pages/Account';
// eslint-disable-next-line import/no-unresolved
import AnimalList from 'src/pages/AnimalList';
// eslint-disable-next-line import/no-unresolved
import Animal from 'src/pages/Animal';
// eslint-disable-next-line import/no-unresolved
import Dashboard from 'src/pages/Dashboard';
// eslint-disable-next-line import/no-unresolved
import Login from 'src/pages/Login';
// eslint-disable-next-line import/no-unresolved
import NotFound from 'src/pages/NotFound';
// eslint-disable-next-line import/no-unresolved
import ProductList from 'src/pages/ProductList';
// eslint-disable-next-line import/no-unresolved
import Register from 'src/pages/Register';
// eslint-disable-next-line import/no-unresolved
import Settings from 'src/pages/Settings';

const routes = (isLoggedIn) => [
  {
    path: '/app',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'animals', element: <AnimalList /> },
      { path: 'animal', element: <Animal /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    // element: !isLoggedIn ? <MainLayout /> : <Navigate to="/app/dashboard" />,
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];
/* https://stackoverflow.com/questions/62384395/protected-route-with-react-router-v6 */
export default routes;
