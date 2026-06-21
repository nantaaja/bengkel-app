import { LuChevronRight } from "react-icons/lu";

export default function PageHeader({ breadcrumb = [], children }) {
  return (
    <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-4">
      <div className="flex items-center gap-2 text-sm text-zinc-400">
        {breadcrumb.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className={index === breadcrumb.length - 1 ? "font-medium text-white" : ""}>{item}</span>

            {index < breadcrumb.length - 1 && <LuChevronRight size={16} />}
          </div>
        ))}
      </div>

      {children}
    </div>
  );
}
