import { LuSearch } from "react-icons/lu";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="mt-6">
      <div className="relative w-full md:w-96">
        <LuSearch size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-zinc-400" />

        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Cari pelanggan, kendaraan, atau kode servis..."
          className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 pr-4 pl-12 text-white transition-all outline-none placeholder:text-zinc-500 focus:border-orange-500"
        />
      </div>
    </div>
  );
}
