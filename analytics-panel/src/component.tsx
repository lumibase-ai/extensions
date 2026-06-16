import type { CSSProperties } from 'react';

interface PanelProps {
  options?: Record<string, any>;
}

interface StatTile {
  label: string;
  value: string;
  hint: string;
}

interface TrendBar {
  day: string;
  /** Relative height 0–100. */
  height: number;
  views: number;
}

// ---- Mock data (no real analytics connection) ----------------------------

const STATS: StatTile[] = [
  { label: 'Pageviews', value: '24,830', hint: 'last 7 days' },
  { label: 'Unique Visitors', value: '8,412', hint: 'last 7 days' },
  { label: 'Avg. Time', value: '2m 14s', hint: 'per session' },
];

const TREND: TrendBar[] = [
  { day: 'Mon', height: 52, views: 3120 },
  { day: 'Tue', height: 68, views: 4080 },
  { day: 'Wed', height: 44, views: 2640 },
  { day: 'Thu', height: 81, views: 4860 },
  { day: 'Fri', height: 95, views: 5700 },
  { day: 'Sat', height: 38, views: 2280 },
  { day: 'Sun', height: 60, views: 3600 },
];

// ---- Styles ---------------------------------------------------------------

const fontStack =
  "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const styles: Record<string, CSSProperties> = {
  card: {
    fontFamily: fontStack,
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: 520,
    background: '#ffffff',
    border: '1px solid #ecedf1',
    borderRadius: 16,
    boxShadow: '0 1px 2px rgba(16,24,40,0.04), 0 8px 24px rgba(16,24,40,0.06)',
    padding: 24,
    color: '#0f172a',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  title: {
    margin: 0,
    fontSize: 17,
    fontWeight: 600,
    letterSpacing: '-0.01em',
    color: '#0f172a',
  },
  chip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '4px 10px',
    fontSize: 12,
    fontWeight: 500,
    color: '#3730a3',
    background: '#eef2ff',
    border: '1px solid #e0e7ff',
    borderRadius: 999,
    whiteSpace: 'nowrap',
  },
  chipDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: '#6366f1',
  },
  statRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 12,
    marginBottom: 22,
  },
  tile: {
    background: '#f8fafc',
    border: '1px solid #eef1f5',
    borderRadius: 12,
    padding: '14px 14px',
  },
  tileLabel: {
    margin: 0,
    fontSize: 12,
    fontWeight: 500,
    color: '#64748b',
  },
  tileValue: {
    margin: '6px 0 2px',
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: '-0.02em',
    color: '#0f172a',
    lineHeight: 1.1,
  },
  tileHint: {
    margin: 0,
    fontSize: 11,
    color: '#94a3b8',
  },
  chartHeader: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  chartTitle: {
    margin: 0,
    fontSize: 13,
    fontWeight: 600,
    color: '#334155',
  },
  trend: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 12,
    fontWeight: 600,
    color: '#16a34a',
  },
  chart: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 8,
    height: 120,
    padding: '4px 2px 0',
    borderBottom: '1px solid #eef1f5',
  },
  barColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
  },
  labelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 8,
  },
  dayLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: 500,
  },
};

function bar(height: number): CSSProperties {
  return {
    width: '100%',
    maxWidth: 28,
    height: `${height}%`,
    minHeight: 4,
    borderRadius: '6px 6px 2px 2px',
    background: 'linear-gradient(180deg, #6366f1 0%, #818cf8 100%)',
    transition: 'height 240ms ease',
  };
}

// ---- Component ------------------------------------------------------------

export default function AnalyticsPanel({ options }: PanelProps) {
  const title = (options?.title as string) || 'Analytics Overview';
  const provider = (options?.provider as string) || 'Plausible';

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>{title}</h3>
        <span style={styles.chip}>
          <span style={styles.chipDot} />
          {provider}
        </span>
      </div>

      <div style={styles.statRow}>
        {STATS.map((stat) => (
          <div key={stat.label} style={styles.tile}>
            <p style={styles.tileLabel}>{stat.label}</p>
            <p style={styles.tileValue}>{stat.value}</p>
            <p style={styles.tileHint}>{stat.hint}</p>
          </div>
        ))}
      </div>

      <div style={styles.chartHeader}>
        <h4 style={styles.chartTitle}>7-day trend</h4>
        <span style={styles.trend}>{'▲'} 12.4% vs last week</span>
      </div>

      <div style={styles.chart}>
        {TREND.map((point) => (
          <div
            key={point.day}
            style={styles.barColumn}
            title={`${point.day}: ${point.views.toLocaleString()} views`}
          >
            <div style={bar(point.height)} />
          </div>
        ))}
      </div>

      <div style={styles.labelRow}>
        {TREND.map((point) => (
          <span key={point.day} style={styles.dayLabel}>
            {point.day}
          </span>
        ))}
      </div>
    </div>
  );
}
