import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

import { firstScreenRoutes } from './modules/firstScreen/routes';
import { loginRoutes } from './modules/login/routes';
import { productRoutes } from './modules/product/routes';
import { useNotification } from './shared/hooks/useNotification';

import type { Router as RemixRouter } from '@remix-run/router';
const router: RemixRouter = createBrowserRouter([
  ...firstScreenRoutes,
  ...loginRoutes,
  ...productRoutes,
]);

function App() {
  const { contextHolder } = useNotification();
  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
