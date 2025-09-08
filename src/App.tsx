import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthLayout from "./modules/shared/components/AuthLayout/AuthLayout";
import NotFound from "./modules/shared/components/NotFound/NotFound";
import Login from "./modules/Auth/components/Login/Login";
import Register from "./modules/Auth/components/Register/Register";
import ForgetPassword from "./modules/Auth/components/ForgetPassword/ForgetPassword";
import ResetPassword from "./modules/Auth/components/ResetPassword/ResetPassword";
import VerifyAccount from "./modules/Auth/components/VerifyAccount/VerifyAccount";
import MasterLayout from "./modules/shared/components/MasterLayout/MasterLayout";
import Home from "./modules/Home/components/Home/Home";
import Projects from "./modules/Projects/components/Projects";
import ProjectsData from "./modules/Projects/components/ProjectsData";
import Tasks from "./modules/Tasks/components/Tasks/Tasks";
import Users from "./modules/Users/components/Users/Users";
import ChangePassword from "./modules/Auth/components/ChangePassword/ChangePassword";
import Profile from "./modules/Profile/components/Profile";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./Contexts/AuthContext/AuthContext";
import ProtectedRouted from "./modules/shared/components/ProtectedRouted/ProtectedRouted";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "", element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "verify-account", element: <VerifyAccount /> },
        { path: "change-password", element: <ChangePassword /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRouted>
          <MasterLayout />
        </ProtectedRouted>
      ),
      errorElement: <NotFound />,
      children: [
        { path: "", element: <Home /> },
        { path: "projects", element: <Projects /> },
        { path: "project-data", element: <ProjectsData /> },

        { path: "project-data/:id?", element: <ProjectsData /> },
        { path: "tasks", element: <Tasks /> },
        { path: "users", element: <Users /> },
        { path: "profile", element: <Profile /> },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer />
      <AuthContextProvider>
        <RouterProvider router={routes}></RouterProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
