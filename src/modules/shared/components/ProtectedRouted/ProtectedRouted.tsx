import { Navigate } from "react-router-dom";

interface ProtectedRoutedProps {
  children: React.ReactNode;
}
const ProtectedRouted = ({ children }: ProtectedRoutedProps) => {
  if (localStorage.getItem("token")) {
    return children;
  }
  return <Navigate to="/" replace />;
};

export default ProtectedRouted;
