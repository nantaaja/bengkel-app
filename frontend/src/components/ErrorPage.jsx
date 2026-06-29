import { useNavigate } from "react-router-dom";

export default function ErrorPage({ code, message, image }) {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    // Ambil data email yang disimpan saat login di localStorage
    const email = localStorage.getItem("USER_EMAIL");

    // Cek jika email yang login adalah owner, arahkan ke rute /owner
    if (email === "twinmotorowner@gmail.com") {
      navigate("/owner");
    } else {
      // Jika admin atau staff, arahkan ke rute utama/default
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#181818] px-4 font-sans text-center">
      <div className="max-w-md w-full flex flex-col items-center">
        {/* Gambar Error */}
        {image && (
          <img 
            src={image} 
            alt={`Error ${code}`} 
            className="h-64 w-64 object-contain mb-6 select-none animate-pulse" 
          />
        )}

        {/* Kode HTTP Error */}
        <h1 className="text-8xl font-black tracking-tight text-orange-500 drop-shadow-md">
          {code}
        </h1>

        {/* Pesan Error */}
        <p className="mt-4 text-lg font-medium text-zinc-400 max-w-sm leading-relaxed">
          {message}
        </p>

        {/* Tombol Kembali Dinamis */}
        <button
          onClick={handleBackToDashboard}
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:bg-orange-600 active:scale-95"
        >
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
}