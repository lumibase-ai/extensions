import { useMemo } from 'react';

interface InterfaceProps<T> {
  value: T | null;
  onChange: (value: T | null) => void;
  disabled?: boolean;
  options?: Record<string, any>;
}

interface SeoMeta {
  title?: string;
  description?: string;
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: '#0f172a',
  },
  field: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
  },
  labelRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#334155',
  },
  counter: {
    fontSize: '12px',
    fontVariantNumeric: 'tabular-nums' as const,
    color: '#64748b',
  },
  counterOver: {
    fontSize: '12px',
    fontVariantNumeric: 'tabular-nums' as const,
    color: '#dc2626',
    fontWeight: 600,
  },
  textInput: {
    height: '40px',
    padding: '0 12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '14px',
    fontFamily: 'inherit',
    color: '#0f172a',
    outline: 'none',
    background: '#ffffff',
    boxSizing: 'border-box' as const,
  },
  textarea: {
    minHeight: '80px',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '14px',
    fontFamily: 'inherit',
    color: '#0f172a',
    outline: 'none',
    resize: 'vertical' as const,
    lineHeight: 1.5,
    background: '#ffffff',
    boxSizing: 'border-box' as const,
  },
  previewWrap: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
  },
  previewLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#94a3b8',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
  },
  previewCard: {
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '16px 18px',
    background: '#ffffff',
    boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
  },
  previewUrl: {
    fontSize: '13px',
    color: '#202124',
    lineHeight: 1.3,
    marginBottom: '2px',
  },
  previewUrlDomain: {
    color: '#202124',
  },
  previewUrlPath: {
    color: '#5f6368',
  },
  previewTitle: {
    fontSize: '20px',
    lineHeight: 1.3,
    color: '#1a0dab',
    margin: '2px 0 4px',
    cursor: 'pointer',
    fontWeight: 400,
  },
  previewDesc: {
    fontSize: '14px',
    lineHeight: 1.58,
    color: '#4d5156',
  },
  placeholder: {
    color: '#9aa0a6',
    fontStyle: 'italic' as const,
  },
} as const;

function truncate(text: string, limit: number): string {
  if (text.length <= limit) return text;
  return `${text.slice(0, Math.max(0, limit - 1)).trimEnd()}…`;
}

export default function SeoMetaInterface({
  value,
  onChange,
  disabled,
  options,
}: InterfaceProps<SeoMeta>) {
  const titleLimit = Number(options?.titleLimit ?? 60);
  const descLimit = Number(options?.descLimit ?? 160);

  const meta: SeoMeta = value ?? {};
  const title = meta.title ?? '';
  const description = meta.description ?? '';

  const update = (patch: Partial<SeoMeta>) => {
    onChange({ ...meta, ...patch });
  };

  const titleOver = title.length > titleLimit;
  const descOver = description.length > descLimit;

  const previewTitle = useMemo(
    () => (title ? truncate(title, titleLimit) : 'Your SEO title appears here'),
    [title, titleLimit],
  );
  const previewDesc = useMemo(
    () =>
      description
        ? truncate(description, descLimit)
        : 'Your meta description preview will show up here as searchers would see it on Google.',
    [description, descLimit],
  );

  return (
    <div style={styles.container}>
      <div style={styles.field}>
        <div style={styles.labelRow}>
          <label style={styles.label} htmlFor="seo-meta-title">
            Meta title
          </label>
          <span style={titleOver ? styles.counterOver : styles.counter}>
            {title.length} / {titleLimit}
          </span>
        </div>
        <input
          id="seo-meta-title"
          type="text"
          value={title}
          disabled={disabled}
          placeholder="e.g. Best Running Shoes for 2026 | Acme"
          onChange={(e) => update({ title: e.target.value })}
          style={{
            ...styles.textInput,
            borderColor: titleOver ? '#fca5a5' : '#e2e8f0',
            opacity: disabled ? 0.6 : 1,
          }}
        />
      </div>

      <div style={styles.field}>
        <div style={styles.labelRow}>
          <label style={styles.label} htmlFor="seo-meta-desc">
            Meta description
          </label>
          <span style={descOver ? styles.counterOver : styles.counter}>
            {description.length} / {descLimit}
          </span>
        </div>
        <textarea
          id="seo-meta-desc"
          value={description}
          disabled={disabled}
          placeholder="A concise summary of the page that entices searchers to click."
          onChange={(e) => update({ description: e.target.value })}
          style={{
            ...styles.textarea,
            borderColor: descOver ? '#fca5a5' : '#e2e8f0',
            opacity: disabled ? 0.6 : 1,
          }}
        />
      </div>

      <div style={styles.previewWrap}>
        <span style={styles.previewLabel}>Google preview</span>
        <div style={styles.previewCard}>
          <div style={styles.previewUrl}>
            <span style={styles.previewUrlDomain}>example.com</span>
            <span style={styles.previewUrlPath}> › page</span>
          </div>
          <div
            style={{
              ...styles.previewTitle,
              ...(title ? {} : styles.placeholder),
            }}
          >
            {previewTitle}
          </div>
          <div
            style={{
              ...styles.previewDesc,
              ...(description ? {} : styles.placeholder),
            }}
          >
            {previewDesc}
          </div>
        </div>
      </div>
    </div>
  );
}
