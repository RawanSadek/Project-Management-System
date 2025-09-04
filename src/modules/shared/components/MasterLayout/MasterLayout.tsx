import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "../SidetBar/SideBar";

const MasterLayout = () => {
  return (
    <>
      <div className="flex flex-col w-screen min-h-screen">
        <div className="h-1/12 shadow-lg">
          <Navbar />
        </div>
        <div className="flex flex-1 bg-[#F5F5F5]">
          <div className="w-1/5">
            <SideBar />
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MasterLayout;
