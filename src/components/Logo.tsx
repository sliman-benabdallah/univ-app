// components/Logo.tsx
import { BRANDING } from "@/lib/branding";

interface LogoProps {
    /** Rendered size (square). Defaults to BRANDING.logoSize. */
    size?: number;
    /** Extra classes for positioning / spacing. */
    className?: string;
}

/**
 * The site logo — plain text / emoji taken from `BRANDING.logoText`.
 * To change it, edit `lib/branding.ts`.
 */
export default function Logo({
    size = BRANDING.logoSize,
    className = "",
}: LogoProps) {
    return (
        <span
            className={`inline-flex shrink-0 select-none items-center justify-center leading-none ${className}`}
            style={{ width: size, height: size, fontSize: size * 0.8 }}
            role="img"
            aria-label={BRANDING.name}
        >
            {BRANDING.logoText}
        </span>
    );
}