// components/ScheduleGrid.tsx
import type { Schedule } from "@/types/schedule";
import {
    GRID_MIN_WIDTH,
    GRID_TEMPLATE_COLUMNS,
    SCHOOL_DAYS,
    TIME_SLOTS,
    TIME_COLUMN_WIDTH,
} from "@/lib/config";
import DayHeader from "./DayHeader";
import ScheduleRow from "./ScheduleRow";

interface ScheduleGridProps {
    /** The full weekly schedule to render. */
    schedule: Schedule;
}

/**
 * The timetable itself:
 *   - a sticky-ish header row with the day names
 *   - one `ScheduleRow` per period
 *
 * The whole grid is horizontally scrollable on small screens.
 */
export default function ScheduleGrid({ schedule }: ScheduleGridProps) {
    return (
        <section className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div style={{ minWidth: GRID_MIN_WIDTH }}>
                {/* ------------------------- Header row ------------------------- */}
                <div
                    className="grid border-b border-slate-200 bg-slate-50"
                    style={{ gridTemplateColumns: GRID_TEMPLATE_COLUMNS }}
                >
                    {/* Empty corner above the time column */}
                    <div
                        className="flex items-center px-3 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400"
                        style={{ width: TIME_COLUMN_WIDTH }}
                    >
                        Time
                    </div>

                    {/* One header per school day */}
                    {SCHOOL_DAYS.map((day, index) => (
                        <DayHeader key={day} day={day} index={index} />
                    ))}
                </div>

                {/* -------------------------- Period rows ----------------------- */}
                {TIME_SLOTS.map((slot) => (
                    <ScheduleRow
                        key={slot.index}
                        slot={slot}
                        // Pull the class of every day for this period index
                        classes={SCHOOL_DAYS.map((day) => schedule[day][slot.index] ?? null)}
                    />
                ))}
            </div>
        </section>
    );
}