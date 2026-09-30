// lib/branding.ts

/**
 * Central branding configuration.
 *
 * The logo is a single text string — change `logoText` to anything
 * (an emoji like 🎓, a letter, or a short word).
 */
export const BRANDING = {
  /** App name shown in the header and page title. */
  name: "Weekly School Schedule",

  /** Small line under the title. */
  tagline: "Saturday to Thursday · no breaks between classes",

  /** The logo itself — just text / emoji. */
  logoText: "🎓",

  /** Rendered size of the logo, in pixels. */
  logoSize: 48,
} as const;