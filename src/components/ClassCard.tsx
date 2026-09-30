// components/ClassCard.tsx
import type { SchoolClass } from "@/types/schedule";
import { CLASS_TYPE_STYLES } from "@/lib/classTypeStyles";

interface ClassCardProps {
    /** The class session to display. */
    schoolClass: SchoolClass;
}

/**
 * A single class card inside the timetable cell.
 * Shows: type, group, place and teacher name.
 */
export default function ClassCard({ schoolClass }: ClassCardProps) {
    // Pick the color palette matching this class type
    const styles = CLASS_TYPE_STYLES[schoolClass.type];

    return (
        <article
            className={`flex h-full w-full flex-col gap-1 rounded-xl border p-3 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md ${styles.card}`}
        >
            {/* Top row: class type badge + student group */}
            <header className="flex items-center justify-between gap-2">
                <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold leading-tight ${styles.badge}`}
                >
                    {schoolClass.type} {schoolClass.module}
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                    {schoolClass.group}
                </span>
            </header>

            {/* Place (room / lab / hall) */}
            <p className="text-sm font-semibold text-slate-800">
                {schoolClass.place}
            </p>

            {/* Teacher name pushed to the bottom of the card */}
            <p className="mt-auto text-xs text-slate-600">{schoolClass.teacher}</p>
        </article>
    );
}