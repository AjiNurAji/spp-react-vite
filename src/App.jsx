import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: 'dashboard/*',
      element: <Dashboard />
    }
  ])

  return (
    <>
      <ToastContainer position='bottom-right' pauseOnHover={false}/>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
