import { FaBell } from 'react-icons/fa';
import homeLogo from '../../../../assets/Images/homeLogo.png';
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from 'react-icons/io';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../Contexts/AuthContext/AuthContext';
import { BsList } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { RiProfileFill } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import noPP from '../../../../assets/Images/noPP.png';

export default function Navbar() {

  const { loginData, logout } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="relative !px-4 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 shadow-sm">
      <div className="relative flex items-center justify-between">

        <div className="items-center">
          <img src={homeLogo} alt="Your Company" className="w-[40%]" />
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          {/* large screens */}
          <div className="hidden sm:flex items-center justify-between gap-5">
            <FaBell className="text-xl text-[#EF9B28] cursor-pointer" />

            <div className="flex justify-between items-center gap-2 border-s border-gray-400 !px-7 cursor-pointer">
              <img src={loginData?.profilePicture ? loginData?.profilePicture : noPP} alt="pp" className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />

              <div className="flex justify-between items-center gap-5">
                <div className="flex flex-col">
                  <h5>{loginData?.userName}</h5>
                  <small className="text-gray-400">{loginData?.userEmail}</small>
                </div>

                {profileOpen ? <IoIosArrowUp onClick={() => setProfileOpen(!profileOpen)} className="text-gray-400 text-xl" /> : <IoIosArrowDown onClick={() => setProfileOpen(!profileOpen)} className="text-gray-400 text-xl" />}
              </div>
            </div>

            {/* drop down list */}
            {profileOpen &&
              <div className="absolute right-0 top-[100%] w-48 origin-top-right bg-white !p-3 shadow-lg border-1 border-gray-100 ring-opacity-5 z-50  rounded-md">
                <Link to='/dashboard/profile' className="w-full flex items-center gap-2 !px-4 !py-2 text-sm hover:bg-[#EF9B284D] rounded-md">
                  <RiProfileFill className="text-[#EF9B28] text-lg" />Profile
                </Link>
                <Link onClick={logout} to='/login' className="w-full flex items-center gap-2 !px-4 !py-2 text-sm hover:bg-[#EF9B284D] rounded-md">
                  <TbLogout2 className="text-[#EF9B28] text-lg" />Sign out
                </Link>
              </div>
            }
          </div>

          {/* small screens */}
          <div className="sm:hidden relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-[#104137] hover:text-[#0e382fb7] focus:outline-2 focus:-outline-offset-1 focus:outline-[#0E382F]"
            >
              {menuOpen ? <IoMdClose className="text-3xl text-[#104137]" /> : <BsList className="text-3xl text-[#104137]" />}
            </button>

            {/* drop down list */}
            {menuOpen && (
              <div className="absolute right-0 !mt-2 w-64 rounded-md bg-white shadow-lg z-50">
                <div className="flex items-center gap-3 !p-4 border-b border-gray-200">
                  <img src={loginData?.profilePicture ? loginData?.profilePicture : noPP} alt="pp" className="w-10 h-10 rounded-full" />
                  <div className="flex flex-col">
                    <h5 className="font-medium text-gray-900">{loginData?.userName}</h5>
                    <small className="text-gray-500 text-[10px]">{loginData?.userEmail}</small>
                  </div>
                </div>

                <div className="!p-2">
                  <Link to='' className="w-full flex items-center gap-2 !px-4 !py-2 text-sm hover:bg-[#EF9B284D] rounded-md">
                    <FaBell className="text-[#EF9B28] text-lg" />Notifications
                  </Link>
                  <Link to='/dashboard/profile' className="w-full flex items-center gap-2 !px-4 !py-2 text-sm hover:bg-[#EF9B284D] rounded-md">
                    <RiProfileFill className="text-[#EF9B28] text-lg" />Profile
                  </Link>
                  <Link onClick={logout} to='/login' className="w-full flex items-center gap-2 !px-4 !py-2 text-sm hover:bg-[#EF9B284D] rounded-md">
                    <TbLogout2 className="text-[#EF9B28] text-lg" />Sign out
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </nav>
  )
}
