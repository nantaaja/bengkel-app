import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles }) {
  const token = localStorage.getItem("ACCESS_TOKEN");
  const userRole = localStorage.getItem("USER_ROLE"); // Langsung ambil role

  // Jika belum login, lempar ke login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Jika halaman ini butuh role tertentu (misal khusus "Owner") dan role user tidak cocok
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/403" replace />; // Lempar ke halaman Forbidden
  }

  return <Outlet />;
}