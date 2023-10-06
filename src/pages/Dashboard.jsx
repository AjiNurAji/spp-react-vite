import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import NotFound from '../components/404'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { handleMe } from '../api/Auth'
import Admin from '../components/dashboard/Admin'
import Petugas from '../components/dashboard/Petugas'
import Siswa from '../components/dashboard//Siswa'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

function Dashboard() {
  const [loader, setLoader] = useState(true)
  const [data, setData] = useState({})
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const fetchData = async () => {
    setLoader(true)
    if (!localStorage.getItem('token') && !localStorage.getItem('role')) {
      toast.error('Anda belum login!')
      navigate('/')
    } else if (localStorage.getItem('role') === 'admin' || localStorage.getItem('role') === 'petugas') {
      const dataMe = await handleMe(localStorage.getItem('token'))
      if (dataMe.data) {
        setData(dataMe.data)
        setLoader(false)
      } else {
        toast.warning('Terjadi kesalahan, silahkan coba lagi!')
        setLoader(false)
        navigate('/')
        localStorage.removeItem('token')
        localStorage.removeItem('role')
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      { loader ? (
        <Loader />
      ) : (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <div className="flex h-screen overflow-hidden">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} data={data} />

              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  <>
                    {
                      localStorage.getItem('role') === 'admin' ? (
                        <Admin profile={data} />
                      ) : (
                        <>
                          {
                            localStorage.getItem('role') === 'petugas' ? (
                              <Petugas profile={data} />
                            ) : (
                                <>
                                  {
                                    localStorage.getItem('role') === 'siswa' ? (
                                      <Siswa profile={data} />
                                    ) : (
                                      <NotFound />
                                    )
                                  }
                                </>
                            )
                          }
                        </>
                      )
                    }
                  </>
                </div>
              </main>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Dashboard