// components/DayHeader.tsx
import type { DayName } from "@/types/schedule";

interface DayHeaderProps {
  /** The day this column represents. */
  day: DayName;
  /** Short index, used only for accessibility labels. */
  index: number;
}

/**
 * The header cell of one day column.
 */
export default function DayHeader({ day, index }: DayHeaderProps) {
  return (
    <div
      className={`border-l border-slate-200 px-3 py-3 text-center ${
        // Give the weekend-ish first day a slightly different tint
        index === 0 ? "bg-slate-100" : ""
      }`}
    >
      <span className="text-sm font-semibold text-slate-700">{day}</span>
    </div>
  );
}