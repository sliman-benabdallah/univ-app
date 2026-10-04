// lib/scheduleData.ts
import type { Schedule } from "@/types/schedule";

/**
 * The weekly schedule content.
 *
 * Every day holds exactly 6 classes (one per period, no breaks):
 *   index 0 → 08:00–09:30
 *   index 1 → 09:30–11:00
 *   index 2 → 11:00–12:30
 *   index 3 → 12:30–14:00
 *   index 4 → 14:00–15:30
 *   index 5 → 15:30–17:00
 *
 * To edit the timetable, just change the objects below.
 * Set an entry to `null` if a period is free.
 */
export const WEEKLY_SCHEDULE: Schedule = {
  /* ---------------------------- Saturday --------------------------- */
  Saturday: [
    { id: "sat-1", type: "Cours", module: "POO1", group: "", place: "S01-A2", teacher: "Boumaaza Farid" },
    null,
    { id: "sat-3", type: "TP", module: "ASD3", group: "G03", place: "L02", teacher: "" },
    null,
    { id: "sat-5", type: "TD", module: "ARCH", group: "G03", place: "S02", teacher: "Lefkir Mira" },
    { id: "sat-6", type: "TP", module: "NetNum", group: "G03", place: "L06", teacher: "Benguesmia Farouk" },
  ],

  /* ----------------------------- Sunday ---------------------------- */
  Sunday: [
    { id: "sun-1", type: "Cours", module: "ProStat1", group: "", place: "S01-A01", teacher: "Bouziane Abderaouf" },
    null,
    null,
    null,
    null,
    null,
  ],

  /* ----------------------------- Monday ---------------------------- */
  Monday: [
    { id: "mon-1", type: "Cours", module: "SI", group: "", place: "S01-A01", teacher: "Chellakh Hafida" },
    null,
    { id: "mon-3", type: "Cours", module: "ARCH", group: "", place: "S01-A10", teacher: "Lefkir Mira" },
    { id: "mon-3", type: "TD", module: "SI", group: "G03", place: "S19", teacher: "" },
    null,
    null,
  ],

  /* ---------------------------- Tuesday ---------------------------- */
  Tuesday: [
    { id: "tue-1", type: "Cours", module: "GestPro", group: "", place: "S01-A10", teacher: "Saha Adel" },
    null,
    null,
    null,
    null,
    null,
  ],

  /* --------------------------- Wednesday --------------------------- */
  Wednesday: [
    { id: "wed-1", type: "TD", module: "ASD", group: "G03", place: "S06", teacher: "Nehar Aicha" },
    { id: "wed-2", type: "TP", module: "ARCH", group: "G03", place: "L03", teacher: "Lefkir Mira" },
    { id: "wed-3", type: "Cours", module: "MeNum", group: "", place: "S01-A02", teacher: "Bachir cherif larbi" },
    null,
    null,
    null,
  ],

  /* ---------------------------- Thursday --------------------------- */
  Thursday: [
    null,
    null,
    null,
    null,
    null,
    null,
  ],
};
