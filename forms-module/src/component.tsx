import { useRef, useState } from 'react';

export interface ModuleProps {
  options?: Record<string, any>;
}

type FieldType = 'text' | 'email' | 'number' | 'textarea' | 'select' | 'checkbox' | 'date';

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
}

interface PaletteEntry {
  type: FieldType;
  label: string;
  glyph: string;
}

const PALETTE: PaletteEntry[] = [
  { type: 'text', label: 'Text', glyph: 'T' },
  { type: 'email', label: 'Email', glyph: '@' },
  { type: 'number', label: 'Number', glyph: '#' },
  { type: 'textarea', label: 'Textarea', glyph: '¶' },
  { type: 'select', label: 'Select', glyph: '▾' },
  { type: 'checkbox', label: 'Checkbox', glyph: '☑' },
  { type: 'date', label: 'Date', glyph: '🗓' },
];

const DEFAULT_LABELS: Record<FieldType, string> = {
  text: 'Text field',
  email: 'Email address',
  number: 'Number',
  textarea: 'Long text',
  select: 'Dropdown',
  checkbox: 'Checkbox',
  date: 'Date',
};

const colors = {
  border: '#e2e8f0',
  borderStrong: '#cbd5e1',
  bg: '#ffffff',
  bgSoft: '#f8fafc',
  bgSofter: '#f1f5f9',
  accent: '#4f46e5',
  accentSoft: '#eef2ff',
  text: '#0f172a',
  textMuted: '#64748b',
  danger: '#dc2626',
};

const baseFont =
  "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export default function FormBuilderModule(_props: ModuleProps) {
  const [fields, setFields] = useState<FormField[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const counterRef = useRef(0);

  const selected = fields.find((f) => f.id === selectedId) ?? null;

  const addField = (type: FieldType) => {
    counterRef.current += 1;
    const id = `field_${Date.now()}_${counterRef.current}`;
    const field: FormField = {
      id,
      type,
      label: DEFAULT_LABELS[type],
      required: false,
    };
    setFields((prev) => [...prev, field]);
    setSelectedId(id);
  };

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
    setSelectedId((cur) => (cur === id ? null : cur));
  };

  const toggleRequired = (id: string) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, required: !f.required } : f)),
    );
  };

  const updateField = (id: string, patch: Partial<FormField>) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  };

  const move = (id: string, dir: -1 | 1) => {
    setFields((prev) => {
      const idx = prev.findIndex((f) => f.id === id);
      if (idx === -1) return prev;
      const target = idx + dir;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      const [item] = next.splice(idx, 1);
      next.splice(target, 0, item);
      return next;
    });
  };

  return (
    <div
      style={{
        fontFamily: baseFont,
        color: colors.text,
        background: colors.bgSoft,
        minHeight: '100%',
        boxSizing: 'border-box',
        padding: 20,
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: -0.3 }}>
            Form Builder
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: colors.textMuted }}>
            Compose a form from the field palette.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12, color: colors.textMuted, fontStyle: 'italic' }}>
            (demo — not persisted)
          </span>
          <button
            type="button"
            disabled
            style={{
              padding: '9px 16px',
              borderRadius: 10,
              border: `1px solid ${colors.borderStrong}`,
              background: colors.bgSofter,
              color: colors.textMuted,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'not-allowed',
              fontFamily: baseFont,
            }}
          >
            Save form
          </button>
        </div>
      </header>

      {/* 3-column layout */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'stretch' }}>
        {/* Left palette */}
        <aside
          style={{
            flex: '0 0 220px',
            background: colors.bg,
            border: `1px solid ${colors.border}`,
            borderRadius: 14,
            padding: 16,
            boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
          }}
        >
          <h2 style={sectionTitle}>Field palette</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            {PALETTE.map((entry) => (
              <button
                key={entry.type}
                type="button"
                onClick={() => addField(entry.type)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: `1px solid ${colors.border}`,
                  background: colors.bgSoft,
                  color: colors.text,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: baseFont,
                  transition: 'background 120ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.accentSoft;
                  e.currentTarget.style.borderColor = colors.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = colors.bgSoft;
                  e.currentTarget.style.borderColor = colors.border;
                }}
              >
                <span
                  aria-hidden
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 26,
                    height: 26,
                    borderRadius: 8,
                    background: colors.bg,
                    border: `1px solid ${colors.border}`,
                    fontSize: 14,
                    fontWeight: 700,
                    color: colors.accent,
                  }}
                >
                  {entry.glyph}
                </span>
                {entry.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Center canvas */}
        <main
          style={{
            flex: '1 1 auto',
            background: colors.bg,
            border: `1px solid ${colors.border}`,
            borderRadius: 14,
            padding: 16,
            minHeight: 320,
            boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h2 style={sectionTitle}>Form canvas</h2>
            <span style={{ fontSize: 12, color: colors.textMuted }}>
              {fields.length} field{fields.length === 1 ? '' : 's'}
            </span>
          </div>

          {fields.length === 0 ? (
            <div
              style={{
                marginTop: 16,
                padding: '48px 20px',
                borderRadius: 12,
                border: `1px dashed ${colors.borderStrong}`,
                background: colors.bgSoft,
                textAlign: 'center',
                color: colors.textMuted,
                fontSize: 14,
              }}
            >
              No fields yet. Pick a field type from the palette to get started.
            </div>
          ) : (
            <ul
              style={{
                listStyle: 'none',
                margin: '16px 0 0',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {fields.map((field, index) => {
                const isSelected = field.id === selectedId;
                return (
                  <li key={field.id}>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedId(field.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedId(field.id);
                        }
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '12px 14px',
                        borderRadius: 12,
                        border: `1px solid ${isSelected ? colors.accent : colors.border}`,
                        background: isSelected ? colors.accentSoft : colors.bgSoft,
                        cursor: 'pointer',
                        boxShadow: isSelected
                          ? `0 0 0 3px ${colors.accentSoft}`
                          : 'none',
                      }}
                    >
                      <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {field.label}
                          </span>
                          {field.required && (
                            <span style={{ color: colors.danger, fontWeight: 700 }}>*</span>
                          )}
                        </div>
                        <span
                          style={{
                            display: 'inline-block',
                            marginTop: 4,
                            fontSize: 11,
                            fontWeight: 600,
                            letterSpacing: 0.4,
                            textTransform: 'uppercase',
                            color: colors.accent,
                            background: colors.bg,
                            border: `1px solid ${colors.border}`,
                            borderRadius: 6,
                            padding: '2px 7px',
                          }}
                        >
                          {field.type}
                        </span>
                      </div>

                      <label
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          fontSize: 12,
                          color: colors.textMuted,
                          cursor: 'pointer',
                          userSelect: 'none',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={() => toggleRequired(field.id)}
                        />
                        Required
                      </label>

                      <div style={{ display: 'flex', gap: 4 }} onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          aria-label="Move up"
                          title="Move up"
                          disabled={index === 0}
                          onClick={() => move(field.id, -1)}
                          style={iconBtn(index === 0)}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          aria-label="Move down"
                          title="Move down"
                          disabled={index === fields.length - 1}
                          onClick={() => move(field.id, 1)}
                          style={iconBtn(index === fields.length - 1)}
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          aria-label="Delete field"
                          title="Delete field"
                          onClick={() => removeField(field.id)}
                          style={{
                            ...iconBtn(false),
                            color: colors.danger,
                            borderColor: '#fecaca',
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </main>

        {/* Right inspector */}
        <aside
          style={{
            flex: '0 0 260px',
            background: colors.bg,
            border: `1px solid ${colors.border}`,
            borderRadius: 14,
            padding: 16,
            boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
          }}
        >
          <h2 style={sectionTitle}>Inspector</h2>
          {selected ? (
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 0.4,
                  textTransform: 'uppercase',
                  color: colors.textMuted,
                }}
              >
                {selected.type} field
              </div>

              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: colors.text }}>Label</span>
                <input
                  type="text"
                  value={selected.label}
                  onChange={(e) => updateField(selected.id, { label: e.target.value })}
                  style={{
                    padding: '9px 11px',
                    borderRadius: 9,
                    border: `1px solid ${colors.borderStrong}`,
                    fontSize: 13,
                    color: colors.text,
                    background: colors.bg,
                    fontFamily: baseFont,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 13,
                  color: colors.text,
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <input
                  type="checkbox"
                  checked={selected.required}
                  onChange={(e) => updateField(selected.id, { required: e.target.checked })}
                />
                Required field
              </label>
            </div>
          ) : (
            <p style={{ marginTop: 14, fontSize: 13, color: colors.textMuted, lineHeight: 1.5 }}>
              Select a field in the canvas to edit its label and settings.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}

const sectionTitle: React.CSSProperties = {
  margin: 0,
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: 0.5,
  textTransform: 'uppercase',
  color: colors.textMuted,
};

function iconBtn(disabled: boolean): React.CSSProperties {
  return {
    width: 30,
    height: 30,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    border: `1px solid ${colors.border}`,
    background: disabled ? colors.bgSofter : colors.bg,
    color: disabled ? colors.borderStrong : colors.text,
    fontSize: 14,
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: baseFont,
    lineHeight: 1,
  };
}
