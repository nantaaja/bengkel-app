import { LuSearch, LuX } from "react-icons/lu";

export default function SearchBar({ value, onChange, onClear, placeholder = "Cari..." }) {
  return (
    <div className="relative inline-flex w-full sm:w-2/3 lg:w-1/2">
      <LuSearch size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-zinc-500 pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 pr-10 pl-11 text-sm text-white placeholder:text-zinc-500 focus:border-orange-500 focus:outline-none"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-500 transition hover:text-white"
        >
          <LuX size={16} />
        </button>
      )}
    </div>
  );
}