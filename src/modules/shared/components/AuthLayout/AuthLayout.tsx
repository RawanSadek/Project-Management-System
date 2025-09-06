import { Outlet, useLocation } from "react-router-dom";
import logo from "../../../../assets/Images/logo.png";
const AuthLayout = () => {
  const location = useLocation();
  const isRegister = location.pathname === "/register";

  return (
    <>
      <div className="authContainer relative">
        <div className="h-full min-h-screen">
          <div className="flex min-h-[100%] justify-center items-center ">
            <div className={`${isRegister ? "md:w-[60%]" : "md:w-[40%]"} `}>
              <div className="logo flex justify-center">
                <img src={logo} alt="logo" className={`w-70`} />
              </div>
              <div className="form-container rounded-2xl !mt-4.5 !px-[12%] !pt-[14%] !pb-[5%]">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
