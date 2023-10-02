import React, { useEffect, useState } from "react";
import logo from "../assets/images/smk.png";
import { useParams } from "react-router-dom";
import { printPDF } from "../api/Crud";
import Loader from "./Loader";
import { toast } from "react-toastify";

function PdfCreated() {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({});
  const params = useParams();

  const fetchData = async () => {
    const dataPembayaran = await printPDF(
      {
        nisn: params.nisn,
        id_pembayaran: params.id_pembayaran,
        id_spp: params.id_spp,
      },
      localStorage.getItem("token")
    );
    if (dataPembayaran.data) {
      setLoader(false);
      setData(dataPembayaran.data);
    } else {
      toast.warning('Sepertinya ada kesalahan, silahkan coba lagi!')
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="p-3" >
          <div className="flex justify-between text-black border-b-2 border-b-black pb-4 mb-8">
            <div
              className="flex items-center justify-center"
              style={{ width: "20%" }}
            >
              <img src={logo} alt="Logo SMKN 4 Kuningan" width={100} />
            </div>
            <div
              className="flex flex-column items-center justify-center"
              style={{ width: "80%" }}
            >
              <h1 className="font-black text-base md:text-2xl">
                BUKTI PEMBAYARAN SPP TAHUN 
              </h1>
            </div>
          </div>
          <div className="flex flex-column justify-between items-center w-full">
            <h2 className="font-semibold text-black text-sm md:text-base">DITERIMA DARI</h2>
            <p></p>
          </div>
        </div>
      )}
    </>
  );
}

export default PdfCreated;
