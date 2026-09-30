// components/TimeLabel.tsx
import type { TimeSlot } from "@/types/schedule";

interface TimeLabelProps {
    /** The period this label describes. */
    slot: TimeSlot;
}

/**
 * The left-hand cell of a row: period number + start/end time.
 */
export default function TimeLabel({ slot }: TimeLabelProps) {
    return (
        <div className="flex flex-col justify-center gap-0.5 border-r border-slate-200 bg-slate-50/70 px-3 py-3">
            {/* Period number (1-based for humans) */}
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Period {slot.index + 1}
            </span>

            {/* Start → end time */}
            <span className="whitespace-nowrap text-xs font-semibold text-slate-700">
                {slot.start} – {slot.end}
            </span>
        </div>
    );
}