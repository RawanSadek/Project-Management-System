import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "../SidetBar/SideBar";

const MasterLayout = () => {
  return (
    <>
      <div className="flex  ">
        <div className="w-1/4">
          <SideBar />
        </div>
        <div className="w-3/4 p-3 ">
          <div className="mb-3">
            <Navbar />
          </div>

          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MasterLayout;
