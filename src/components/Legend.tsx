// components/Legend.tsx
import { CLASS_TYPE_STYLES } from "@/lib/classTypeStyles";

/**
 * Small color legend explaining what every class type looks like.
 * It is generated automatically from `CLASS_TYPE_STYLES`,
 * so adding a new class type updates the legend for free.
 */
export default function Legend() {
    return (
        <section className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Class types
            </span>

            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {Object.entries(CLASS_TYPE_STYLES).map(([type, style]) => (
                    <li key={type} className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
                        <span className="text-xs font-medium text-slate-600">{type}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}