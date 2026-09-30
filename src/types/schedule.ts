// types/schedule.ts

/**
 * All possible kinds of a class session.
 * Add a new string here + a matching entry in `lib/classTypeStyles.ts`
 * to introduce a brand new class type.
 */
export type ClassType =
  | "Cours"
  | "TD"
  | "TP"
  | "Exam";

/**
 * The school week runs from Saturday to Thursday (Friday is off).
 */
export type DayName =
  | "Saturday"
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday";

/**
 * A single class session placed inside the weekly grid.
 */
export interface SchoolClass {
  id: string;      // unique key, used by React
  type: ClassType; // kind of session (drives the card color)
  module: string;
  group?: string;   // student group attending, e.g. "G1"
  place: string;   // room / lab / hall name
  teacher: string; // teacher full name
}

/**
 * One period of the day.
 * Example: { index: 0, start: "08:00", end: "09:30" }
 */
export interface TimeSlot {
  index: number; // 0-based position inside the day
  start: string; // "HH:MM"
  end: string;   // "HH:MM"
}

/**
 * The complete weekly schedule.
 * For every day we store an ordered list of periods
 * (a `null` entry means the slot is currently free).
 */
export type Schedule = Record<DayName, (SchoolClass | null)[]>;