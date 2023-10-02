import axios from "axios"

const URL = 'http://127.0.0.1:8000'

export const printPDF = async ({ nisn, id_pembayaran, id_spp }, token) => {
  try {
    const data = axios.get(`${URL}/${nisn}/generate/${id_spp}/${id_pembayaran}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    return error
  }
}