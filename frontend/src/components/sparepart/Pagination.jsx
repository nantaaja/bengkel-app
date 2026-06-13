import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function Pagination({ currentPage, totalPages, onPrevious, onNext, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-6 flex items-center justify-between">
      <p className="text-sm text-zinc-400">
        Halaman <span className="font-medium text-white">{currentPage}</span> dari{" "}
        <span className="font-medium text-white">{totalPages}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={onPrevious}
          disabled={currentPage === 1}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <LuChevronLeft size={18} />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-medium transition ${
              currentPage === page
                ? "bg-orange-600 text-white"
                : "border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <LuChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
