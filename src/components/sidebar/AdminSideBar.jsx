import { faAngleDown, faAngleLeft, faClockRotateLeft, faDatabase, faGauge, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { NavLink } from 'react-router-dom'
import SideBarLinkGroup from './SideBarLinkGroup'

function AdminSideBar(props) {
  console.log(props)
  return (
    <>
      <li>
        <NavLink
          to="/dashboard"
          className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${props.pathname.includes(
            "dashboard"
          ) && "bg-graydark"}`}
        >
          <FontAwesomeIcon icon={faGauge} />
          Dashboard
        </NavLink>
      </li>

      {/* <!-- Menu Item Forms --> */}
      <SideBarLinkGroup
        activeCondition={
          props.pathname === "/datas" || props.pathname.includes("datas")
        }
      >
        {(handleClick, open) => {
          return (
            <React.Fragment>
              <NavLink
                to="#"
                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${(props.pathname ===
                  "/datas" ||
                  props.pathname.includes("datas")) &&
                  "bg-graydark"}`}
                onClick={e => {
                  e.preventDefault()
                  props.sidebarExpanded
                    ? handleClick()
                    : props.setSidebarExpanded(true)
                }}
              >
                <FontAwesomeIcon icon={faDatabase} />
                Datas
                <FontAwesomeIcon icon={open ? faAngleDown : faAngleLeft} className='absolute right-4 top-1/2 -translate-y-1/2 fill-current'/>
              </NavLink>
              {/* <!-- Dropdown Menu Start --> */}
              <div
                className={`translate transform overflow-hidden ${!open &&
                  "hidden"}`}
              >
                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                  <li>
                    <NavLink
                      to="/datas/siswa"
                      className={({ isActive }) =>
                        "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                        (isActive && "!text-white")
                      }
                    >
                      Siswa
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/datas/petugas"
                      className={({ isActive }) =>
                        "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                        (isActive && "!text-white")
                      }
                    >
                      Petugas
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/datas/kelas"
                      className={({ isActive }) =>
                        "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                        (isActive && "!text-white")
                      }
                    >
                      Kelas
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/forms/form-layout"
                      className={({ isActive }) =>
                        "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                        (isActive && "!text-white")
                      }
                    >
                      SPP
                    </NavLink>
                  </li>
                </ul>
              </div>
              {/* <!-- Dropdown Menu End --> */}
            </React.Fragment>
          )
        }}
      </SideBarLinkGroup>
      {/* <!-- Menu Item Forms --> */}

      <li>
        <NavLink
          to="/transactions"
          className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out ${props.pathname.includes(
            "transactions"
          ) && "bg-graydark"}`}
        >
          <FontAwesomeIcon icon={faMoneyBillTransfer} />
          Transactions
        </NavLink>
      </li>

      {/* <!-- Menu Item Tables --> */}
      <li>
        <NavLink
          to="/history"
          className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${props.pathname.includes(
            "history"
          ) && "bg-graydark"}`}
        >
          <FontAwesomeIcon icon={faClockRotateLeft} />
          History
        </NavLink>
      </li>
    </>
  )
}

export default AdminSideBar