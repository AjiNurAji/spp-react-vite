import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faArrowRightFromBracket,
  faUser,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { logout, logoutSiswa } from "../api/Auth";
import { toast } from "react-toastify";
import Loading from "./Loading";

const DropdownUser = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const navigate = useNavigate()

  const handleLogout = async (e) => {
    e.preventDefault()
    setLoading(true)
    if(localStorage.getItem('role') == 'siswa') {
      const logoutResult = await logoutSiswa(localStorage.getItem('token'));
      if (logoutResult.data) {
        setLoading(false)
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        toast.success('Berhasil logout');
        navigate('/')
      } else {
        setLoading(false)
        toast.error('Gagal logout, silahkan coba lagi!');
      }
    } else {
      const logoutResult = await logout(localStorage.getItem('token'));
      if (logoutResult.data) {
        setLoading(false)
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        toast.success('Berhasil logout');
        navigate('/')
      } else {
        setLoading(false)
        toast.error('Gagal logout, silahkan coba lagi!');
      }
    }
  };

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="text-right block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {localStorage.getItem("role") == "siswa"
              ? props.user.nama
              : props.user.nama_petugas}
          </span>
          <span className="block text-xs">
            {localStorage.getItem("role") == "siswa"
              ? props.user.id_kelas
              : props.user.level}
          </span>
        </span>

        <span className="h-12 w-12 rounded-full flex justify-center items-center bg-whiten dark:bg-body">
          <FontAwesomeIcon icon={faUser} style={{ fontSize: "20px" }} />
        </span>

        <FontAwesomeIcon
          icon={dropdownOpen ? faAngleDown : faAngleUp}
          className="hidden fill-current sm:block"
          style={{ fontSize: "18px" }}
        />
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <FontAwesomeIcon icon={faUserAlt} style={{ fontSize: "20px" }} />
              Profile
            </Link>
          </li>
        </ul>
        {loading ? (
          <button className="flex items-center justify-center py-4 px-6" disable>
            <Loading />
          </button>
        ) : (
          <button className="flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base" onClick={handleLogout}>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              style={{ fontSize: "20px" }}
              rotation={180}
            />
            Log Out
          </button>
        )}
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
