import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginAdminPetugas, loginSiswa } from "../api/Auth";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Loader from "../components/Loader";

function Login() {
  const [role, setRole] = useState(true);
  document.title = `Login ${role ? 'Admin atau Petugas' : 'Siswa/i'}`
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate();

  const handleInput = (e, getName) => {
    setData({
      ...data,
      [getName]: e.target.value
    })
  }

  const handleLevel = (e) => {
    if (e.target.selectedIndex === 0) {
      setData({
        ...data,
        level: false
      })
    } else {
      setData({
        ...data,
        level: e.target.value
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if(role) {
      if (data.level === undefined || !data.level) {
        toast.warning('Mohon pilih level!')
        document.getElementById('level').focus()
        setLoading(false)
      } else if (data.username === undefined) {
        toast.warning('Mohon isi username!')
        document.getElementById('username').focus()
        setLoading(false)
      } else if (data.password === undefined) {
        toast.warning('Mohon isi password!')
        document.getElementById('password').focus()
        setLoading(false)
      } else {
        const dataLogin = await loginAdminPetugas(data);
        if (dataLogin.data) {
          setLoading(false)
          document.getElementById('login-form').reset()
          localStorage.setItem('token', dataLogin.data.access_token)
          toast.success('Berhasil login')
          if(data.level === 'admin') {
            localStorage.setItem('role', 'admin')
            navigate('/dashboard')
          } else {
            localStorage.setItem('role', 'petugas')
            navigate('/dashboard')
          }
        } else {
          toast.error('Terjadi kesalahan mohon cek kembali username atau password anda!')
          setLoading(false)
        }
      }
    } else {
      if (data.nisn === undefined) {
        toast.warning('Mohon isi nisn!')
        document.getElementById('nisn').focus()
        setLoading(false)
      } else if (data.nis === undefined) {
        toast.warning('Mohon isi password!')
        document.getElementById('nis').focus()
        setLoading(false)
      } else {
        const dataLogin = await loginSiswa(data);
        if (dataLogin.data) {
          setLoading(false)
          document.getElementById('login-form').reset()
          localStorage.setItem('token', dataLogin.data.access_token)
          localStorage.setItem('role', 'siswa')
          toast.success('Berhasil login')
          navigate('/dashboard')
        } else {
          toast.error('Terjadi kesalahan mohon cek kembali nisn atau password anda!')
          setLoading(false)
        }
      }
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setLoader(false)  
    } else {
      toast.warning('Anda sudah login!')
      navigate('/dashboard')
    }
  }, [])

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center h-screen bg-whiten px-6">
          <div className="rounded border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full md:w-1/2">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Login {role ? "Admin & Petugas" : "Siswa/i"}
              </h3>
            </div>
            <form action="#" method="post" id="login-form">
              <div className="p-6.5">
                {role ? (
                  <>
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white" htmlFor="username">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        placeholder="Masukkan username"
                        autoComplete="false"
                        onChange={(e) => handleInput(e, "username")}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white" htmlFor="password">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        onChange={(e) => handleInput(e, "password")}
                        placeholder="Masukkan password"
                        autoComplete="current-password"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Level
                      </label>
                      <div className="bg-transparent dark:bg-form-input">
                        <select
                          id="level"
                          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          onChange={handleLevel}
                        >
                          <option value="Tidak Valid">Pilih level</option>
                          <option value="admin">Admin</option>
                          <option value="petugas">Petugas</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4.5">
                      <a
                        className="cursor-pointer text-sm text-primary"
                        onClick={() => setRole(false)}
                      >
                        Login Sebagai Siswa/i?
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white" htmlFor="nisn">
                        Nisn
                      </label>
                      <input
                        type="text"
                        id="nisn"
                        maxLength={10}
                        placeholder="Masukkan nisn"
                        autoComplete="false"
                        onChange={(e) => handleInput(e, "nisn")}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white" htmlFor="nis">
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="Masukkan password"
                        maxLength={8}
                        id="nis"
                        onChange={(e) => handleInput(e, "nis")}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        autoComplete="current-password"
                      />
                      <i className="text-body text-sm text-normal">Note: Password isi dengan nis kalian masing-masing!</i>
                    </div>
                    <div className="mb-4.5">
                      <a
                        className="cursor-pointer text-sm text-primary"
                        onClick={() => setRole(true)}
                      >
                        Login Sebagai Admin atau Petugas?
                      </a>
                    </div>
                  </>
                )}
                {loading ? (
                  <button className="flex w-full justify-center rounded bg-transparent border-solid border border-primary p-3" disabled>
                    <Loading />
                  </button>
                ) : (
                  <>
                    <Button text="Login" onClick={handleSubmit}/>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
