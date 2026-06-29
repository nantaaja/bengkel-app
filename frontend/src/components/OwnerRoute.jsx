import { Navigate } from "react-router-dom";

export default function OwnerRoute({ children }) {
    const email = localStorage.getItem("USER_EMAIL");
    
    // Cek apakah yang login benar-benar Owner
    if (email === "twinmotorowner@gmail.com") {
        return children; // Izinkan masuk
    }
    
    // Jika bukan Owner (berarti Admin), tendang ke halaman 403 (Forbidden)
    return <Navigate to="/403" replace />; 
}