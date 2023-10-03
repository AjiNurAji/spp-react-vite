import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard'
import Sidebar from './components/Sidebar'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: 'dashboard/*',
      element: <Dashboard />
    },
    {
      path: '/t',
      element: <Sidebar />
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
