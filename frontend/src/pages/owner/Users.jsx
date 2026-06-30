import { useState, useEffect } from "react";
import { LuSearch, LuPlus, LuPencil, LuTrash2 } from "react-icons/lu";
import api from "../../api/axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" atau "edit"
  const [formData, setFormData] = useState({ id: null, name: "", email: "", role: "Admin" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (mode, user = null) => {
    setModalMode(mode);
    if (mode === "edit" && user) {
      setFormData({ id: user.id, name: user.name, email: user.email, role: user.role });
    } else {
      setFormData({ id: null, name: "", email: "", role: "Admin" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === "add") {
        await api.post("/users", formData);
      } else {
        await api.put(`/users/${formData.id}`, formData);
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      alert(error.response?.data?.message || "Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      try {
        await api.delete(`/users/${id}`);
        fetchUsers();
      } catch (error) {
        alert("Gagal menghapus pengguna.");
      }
    }
  };

  const filteredUsers = users.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <div className="animate-pulse p-6 text-zinc-400">Memuat data pengguna...</div>;

  return (
    <div className="p-6 font-sans">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-white">Manajemen Karyawan</h1>
          <p className="mt-1 text-zinc-400">Kelola akses akun Admin bengkel Anda.</p>
        </div>
        <button
          onClick={() => handleOpenModal("add")}
          className="flex h-11 items-center gap-2 rounded-xl bg-[#F24822] px-5 text-sm font-bold text-white transition-all hover:bg-orange-600"
        >
          <LuPlus size={18} /> Tambah Akun
        </button>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="relative mb-6 w-full md:w-[300px]">
          <LuSearch className="absolute top-3.5 left-3 text-zinc-500" size={16} />
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 w-full rounded-xl border border-white/10 bg-zinc-900 pr-4 pl-10 text-sm text-white outline-none focus:border-[#F24822]"
          />
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white/5 text-zinc-400">
              <tr>
                <th className="rounded-l-lg py-3 pr-4 pl-4 font-medium">Nama</th>
                <th className="py-3 pr-4 font-medium">Email</th>
                <th className="py-3 pr-4 font-medium">Role</th>
                <th className="rounded-r-lg py-3 pr-4 text-center font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="text-zinc-300 hover:bg-white/[0.02]">
                  <td className="py-4 pr-4 pl-4 font-medium text-white">{user.name}</td>
                  <td className="py-4 pr-4">{user.email}</td>
                  <td className="py-4 pr-4">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
                        user.role === "Owner"
                          ? "border-orange-500/30 bg-orange-500/10 text-orange-400"
                          : "border-white/10 bg-zinc-800 text-zinc-300"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-center">
                    {/* HANYA TAMPILKAN TOMBOL EDIT JIKA BUKAN OWNER */}
                    {user.role !== "Owner" && (
                      <button
                        onClick={() => handleOpenModal("edit", user)}
                        className="mx-2 text-zinc-400 hover:text-white"
                      >
                        <LuPencil size={18} />
                      </button>
                    )}

                    {/* TOMBOL HAPUS TETAP HANYA UNTUK NON-OWNER */}
                    {user.role !== "Owner" && (
                      <button onClick={() => handleDelete(user.id)} className="mx-2 text-zinc-400 hover:text-red-400">
                        <LuTrash2 size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">
            <h2 className="mb-6 text-xl font-bold text-white">
              {modalMode === "add" ? "Tambah Akun Karyawan" : "Edit Akun Karyawan"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/50 p-3 text-white outline-none focus:border-[#F24822]"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">Email Google</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/50 p-3 text-white outline-none focus:border-[#F24822]"
                />
              </div>

              {/* PERUBAHAN DI SINI: Role tidak lagi berupa dropdown, melainkan teks statis */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">Role (Hak Akses)</label>
                <div className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-zinc-400">Admin</div>
                <input type="hidden" value="Admin" /> {/* Nilai tetap dikirim saat form di-submit */}
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl px-5 py-2.5 text-sm font-semibold text-zinc-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#F24822] px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
