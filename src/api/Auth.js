import axios from "axios"

const URL = 'http://127.0.0.1:8000'

export const loginAdminPetugas = async ({ username, password }) => {
  try {
    const data = await axios.post(`${URL}/api/auth/login`, {
      username, password
    });

    return data;
  } catch (error) {
    return error
  }
}

export const loginSiswa = async ({ nisn, nis }) => {
  try {
    const data = await axios.post(`${URL}/api/auth/login-siswa`, {
      nisn, nis
    });

    return data;
  } catch (error) {
    return error
  }
}

export const handleMe = async (token) => {
  try {
    const data = await axios.post(`${URL}/api/auth/me`, {}, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    return data;
  } catch (error) {
    return error
  }
}

export const logout = async (token) => {
  try {
    const data = await axios.post(`${URL}/api/auth/logout`, {}, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    return data;
  } catch (error) {
    return error
  }
}

export const logoutSiswa = async (token) => {
  try {
    const data = await axios.post(`${URL}/api/auth/logout-siswa`, {}, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    return data;
  } catch (error) {
    return error
  }
}