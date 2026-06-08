import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Accounts from '../pages/Accounts'
import AccountDetail from '../pages/AccountDetail'
import AppLayout from '../components/templates/AppLayout'

function GuestLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }
  return <Outlet />
}

export const router = createBrowserRouter([
  {
    element: <GuestLayout />,
    children: [{ path: '/', element: <Login /> }],
  },
  {
    element: <AppLayout />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/accounts', element: <Accounts /> },
      { path: '/account/:id', element: <AccountDetail /> },
    ],
  },
])
