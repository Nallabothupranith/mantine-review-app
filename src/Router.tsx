import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
} from 'react-router-dom';
import { HomePage } from './pages/Home';
import GamePage from './pages/Game/Game.page';
import AppLayout from './layout/AppLayout';
import GuestLayout from './layout/GuestLayout';
import { UsersPage } from './pages/User/Users.page';
import { UserDetailsPage } from './pages/UserDetails/UserDetails.page';

const SignedIn = true;

const PrivateRoutes = () => {
  const location = useLocation();

  return SignedIn ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to="/authentication/signin" replace state={{ from: location }} />
  );
};

const LoginRoute = () =>
  SignedIn ? (
    <Navigate to="/" replace />
  ) : (
    <GuestLayout>
      <Outlet />
    </GuestLayout>
  );

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoutes />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'game', element: <GamePage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'user/:id', element: <UserDetailsPage /> },
      { path: 'projects', element: <>TODO: Projects page</> },
    ],
  },
  {
    path: '/authentication',
    element: <LoginRoute />,
    children: [
      { path: 'signin', element: <>Login page</> },
      {
        path: 'register',
        element: <>TODO: Register page</>,
      },
    ],
  },
  {
    path: '/not-found',
    element: <>TODO: 404 page</>,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
