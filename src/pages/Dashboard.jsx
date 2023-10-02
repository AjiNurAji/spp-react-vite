import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import NotFound from '../components/404'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { handleMe } from '../api/Auth'
import Admin from '../components/dashboard/Admin'
import Petugas from '../components/dashboard/Petugas'
import Siswa from '../components/dashboard//Siswa'

function Dashboard() {
  const [loader, setLoader] = useState(true)
  const [data, setData] = useState({})
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoader(true)
    if (!localStorage.getItem('token') && !localStorage.getItem('role')) {
      toast.error('Anda belum login!')
      navigate('/')
    } else if (localStorage.getItem('role') === 'admin' || localStorage.getItem('role') === 'petugas') {
      const dataMe = await handleMe(localStorage.getItem('token'))
      if (dataMe.data) {
        setData(data)
        setLoader(false)
      } else {
        toast.warning('Terjadi kesalahan, silahkan coba lagi!')
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
      )}
    </>
  )
}

export default Dashboard