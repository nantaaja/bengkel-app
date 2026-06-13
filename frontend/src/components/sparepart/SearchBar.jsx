import { LuSearch, LuX } from "react-icons/lu";

export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="relative mt-8">
      {/* Search Icon */}
      <LuSearch size={20} className="absolute top-1/2 left-5 -translate-y-1/2 text-zinc-500" />

      {/* Input */}
      <input
        type="text"
        placeholder="Cari kode barang, nama barang, atau supplier..."
        value={value}
        onChange={onChange}
        className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 pr-14 pl-14 text-sm text-white placeholder:text-zinc-500 focus:border-orange-500 focus:outline-none"
      />

      {/* Clear Button */}
      {value && (
        <button
          onClick={onClear}
          className="absolute top-1/2 right-4 -translate-y-1/2 text-zinc-500 transition hover:text-white"
        >
          <LuX size={18} />
        </button>
      )}
    </div>
  );
}
