import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "../SidetBar/SideBar";

const MasterLayout = () => {
  return (
    <>
      <div className="flex-col min-w-screen min-h-[850px]">
        <div className="shadow-lg">
          <Navbar />
        </div>
        <div className="flex flex-1 bg-[#F5F5F5] min-h-[850px]">
          <SideBar />
          <div className="w-[100%]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default MasterLayout;
