import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/admin/Dashboard'
import DashboardPetugas from './pages/petugas/DashboardPetugas'
import DashboardSiswa from './pages/siswa/DashboardSiswa'
import Loader from './components/Loader'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/admin',
      element: <Dashboard />
    }, 
    {
      path: '/petugas',
      element: <DashboardPetugas />
    },
    {
      path: '/dashboard',
      element: <DashboardSiswa />
    },
    {
      path: '/t',
      element: <Loader />
    }
  ])

  return (
    <>
      <ToastContainer position='bottom-right' pauseOnHover={false} />
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
