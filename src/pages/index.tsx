import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AddOrEditPage } from './AddOrEdit/AddOrEditPage';
import { HomePage } from './Home/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/add',
    element: <AddOrEditPage />,
  },
  {
    path: '/edit/:id',
    element: <AddOrEditPage />,
  },
  {
    path: '*',
    element: <div>Not found</div>,
  },
]);

export const Root: React.FC = () => {
  return <RouterProvider router={router} />;
};
