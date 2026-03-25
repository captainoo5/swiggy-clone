import { Link, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const admin = JSON.parse(localStorage.getItem("admin"));

  if (!token || !admin) {
    return <Link to="/admin" replace />;
  }

  if (admin.role !== "admin") {
    return <Link to="/admin" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;