import { useNavigate } from "react-router-dom";

export default function ErrorPage({ code, message, image }) {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    // Ambil data role yang disimpan saat login
    const role = localStorage.getItem("USER_ROLE");

    // Cek langsung rolenya
    if (role === "Owner") {
      navigate("/owner");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#181818] px-4 text-center font-sans">
      <div className="flex w-full max-w-md flex-col items-center">
        {/* Gambar Error */}
        {image && (
          <img src={image} alt={`Error ${code}`} className="mb-6 h-64 w-64 animate-pulse object-contain select-none" />
        )}

        {/* Kode HTTP Error */}
        <h1 className="text-8xl font-black tracking-tight text-orange-500 drop-shadow-md">{code}</h1>

        {/* Pesan Error */}
        <p className="mt-4 max-w-sm text-lg leading-relaxed font-medium text-zinc-400">{message}</p>

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
