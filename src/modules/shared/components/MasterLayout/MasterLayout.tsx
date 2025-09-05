import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "../SidetBar/SideBar";

const MasterLayout = () => {
  return (
    <>
      <div className="flex flex-col w-screen min-h-screen">
        <div className="shadow-lg">
          <Navbar />
        </div>
        <div className="flex flex-1 bg-[#F5F5F5]">
          <div>
            <SideBar />
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MasterLayout;
