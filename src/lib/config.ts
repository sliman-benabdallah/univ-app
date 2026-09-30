// lib/config.ts
import type { DayName, TimeSlot } from "@/types/schedule";

/* ------------------------------------------------------------------ */
/*  School week                                                        */
/* ------------------------------------------------------------------ */

/** School days, Saturday → Thursday (Friday is the weekend). */
export const SCHOOL_DAYS: DayName[] = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
];

/* ------------------------------------------------------------------ */
/*  Timing rules                                                       */
/* ------------------------------------------------------------------ */

/** Day starts at 08:00 (expressed as minutes from midnight). */
export const DAY_START_MINUTES = 8 * 60; // 480

/** Day ends at 17:00 (expressed as minutes from midnight). */
export const DAY_END_MINUTES = 17 * 60; // 1020

/** Every class lasts exactly 1 hour and 30 minutes. */
export const CLASS_DURATION_MINUTES = 90;

/**
 * There are NO breaks between classes, so the number of periods
 * is simply the total day length divided by the class duration.
 * (1020 - 480) / 90 = 6 periods per day.
 */
export const PERIODS_PER_DAY =
  (DAY_END_MINUTES - DAY_START_MINUTES) / CLASS_DURATION_MINUTES;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Turns "minutes from midnight" into a "HH:MM" string. */
export function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

/** Turns 90 into "1h 30m" (used in the header stats). */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours && mins) return `${hours}h ${mins}m`;
  if (hours) return `${hours}h`;
  return `${mins}m`;
}

/* ------------------------------------------------------------------ */
/*  Generated time slots                                               */
/* ------------------------------------------------------------------ */

/**
 * Built automatically from the rules above, so you never have to
 * write the times by hand:
 *   08:00–09:30 | 09:30–11:00 | 11:00–12:30
 *   12:30–14:00 | 14:00–15:30 | 15:30–17:00
 */
export const TIME_SLOTS: TimeSlot[] = Array.from(
  { length: PERIODS_PER_DAY },
  (_, index) => {
    const start = DAY_START_MINUTES + index * CLASS_DURATION_MINUTES;
    const end = start + CLASS_DURATION_MINUTES;
    return {
      index,
      start: minutesToTime(start),
      end: minutesToTime(end),
    };
  },
);

/* ------------------------------------------------------------------ */
/*  Layout constants (shared by the grid components)                   */
/* ------------------------------------------------------------------ */

/** Width of the left-hand "time" column, in pixels. */
export const TIME_COLUMN_WIDTH = 120;

/** Minimum width of one day column, in pixels. */
export const DAY_COLUMN_MIN_WIDTH = 150;

/**
 * The CSS grid template used by both the header row and every period row.
 * Keeping it in one place guarantees the columns always line up.
 */
export const GRID_TEMPLATE_COLUMNS = `${TIME_COLUMN_WIDTH}px repeat(${SCHOOL_DAYS.length}, minmax(${DAY_COLUMN_MIN_WIDTH}px, 1fr))`;

/** Minimum width of the whole table (used to trigger horizontal scroll). */
export const GRID_MIN_WIDTH =
  TIME_COLUMN_WIDTH + SCHOOL_DAYS.length * DAY_COLUMN_MIN_WIDTH;