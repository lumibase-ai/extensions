import type { CSSProperties } from 'react';

type MediaFormat = 'webp' | 'avif' | 'jpeg' | 'png';

interface MediaValue {
  format?: MediaFormat | string;
  optimized?: boolean;
  originalKb?: number;
  optimizedKb?: number;
}

interface DisplayProps<T> {
  value: T | null;
  options?: Record<string, unknown>;
}

const FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';

const containerStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 6,
  fontFamily: FONT_STACK,
  lineHeight: 1,
};

const basePillStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  padding: '3px 8px',
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: 0.2,
  whiteSpace: 'nowrap',
  border: '1px solid transparent',
};

const palette = {
  greenBg: '#dcfce7',
  greenFg: '#166534',
  greenBorder: '#bbf7d0',
  amberBg: '#fef3c7',
  amberFg: '#92400e',
  amberBorder: '#fde68a',
  grayBg: '#f1f5f9',
  grayFg: '#475569',
  grayBorder: '#e2e8f0',
  blueBg: '#dbeafe',
  blueFg: '#1e40af',
  blueBorder: '#bfdbfe',
} as const;

function isGreenFormat(format: string): boolean {
  const f = format.toLowerCase();
  return f === 'webp' || f === 'avif';
}

function formatPillStyle(format: string): CSSProperties {
  if (isGreenFormat(format)) {
    return {
      ...basePillStyle,
      backgroundColor: palette.greenBg,
      color: palette.greenFg,
      borderColor: palette.greenBorder,
    };
  }
  // jpeg / png (and any other legacy format) → amber
  return {
    ...basePillStyle,
    backgroundColor: palette.amberBg,
    color: palette.amberFg,
    borderColor: palette.amberBorder,
  };
}

function computeSavings(originalKb?: number, optimizedKb?: number): number | null {
  if (
    typeof originalKb !== 'number' ||
    typeof optimizedKb !== 'number' ||
    !Number.isFinite(originalKb) ||
    !Number.isFinite(optimizedKb) ||
    originalKb <= 0 ||
    optimizedKb < 0 ||
    optimizedKb > originalKb
  ) {
    return null;
  }
  return Math.round(((originalKb - optimizedKb) / originalKb) * 100);
}

export default function MediaBadgeDisplay({ value, options }: DisplayProps<MediaValue>) {
  const media: MediaValue = value && typeof value === 'object' ? value : {};

  const showSavings = options?.showSavings !== false; // default true

  const format =
    typeof media.format === 'string' && media.format.trim().length > 0
      ? media.format.trim()
      : null;

  const optimized = media.optimized === true;

  const savings = computeSavings(media.originalKb, media.optimizedKb);

  // Nothing meaningful to show.
  if (!format && media.optimized === undefined && savings === null) {
    return (
      <span style={{ ...basePillStyle, backgroundColor: palette.grayBg, color: palette.grayFg, borderColor: palette.grayBorder }}>
        No media
      </span>
    );
  }

  return (
    <span style={containerStyle}>
      {format && (
        <span style={formatPillStyle(format)} title={`Format: ${format}`}>
          {format.toUpperCase()}
        </span>
      )}

      {media.optimized !== undefined &&
        (optimized ? (
          <span
            style={{
              ...basePillStyle,
              backgroundColor: palette.greenBg,
              color: palette.greenFg,
              borderColor: palette.greenBorder,
            }}
            title="Optimized"
          >
            <span aria-hidden style={{ fontSize: 12, lineHeight: 1 }}>
              &#10003;
            </span>
            Optimized
          </span>
        ) : (
          <span
            style={{
              ...basePillStyle,
              backgroundColor: palette.grayBg,
              color: palette.grayFg,
              borderColor: palette.grayBorder,
            }}
            title="Not optimized"
          >
            Not optimized
          </span>
        ))}

      {showSavings && savings !== null && (
        <span
          style={{
            ...basePillStyle,
            backgroundColor: palette.blueBg,
            color: palette.blueFg,
            borderColor: palette.blueBorder,
          }}
          title={`Saved ${savings}% (${media.originalKb}KB → ${media.optimizedKb}KB)`}
        >
          -{savings}%
        </span>
      )}
    </span>
  );
}
