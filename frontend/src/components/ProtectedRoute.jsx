import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    return localStorage.getItem("ACCESS_TOKEN") ? <Outlet /> : <Navigate to="/login" />;
}