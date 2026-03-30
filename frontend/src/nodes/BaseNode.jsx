import { Handle, Position } from 'reactflow';

/**
 * BaseNode — the shared abstraction for all pipeline nodes.
 *
 * Props:
 *  id         – node ID (from React Flow)
 *  data       – node data object
 *  label      – display title of the node
 *  color      – accent color (CSS custom property value or hex)
 *  icon       – emoji or SVG string shown in the header
 *  inputs     – array of handle configs: [{ id, label, position? }]
 *  outputs    – array of handle configs: [{ id, label, position? }]
 *  children   – content to render inside the node body
 *  minWidth   – minimum width in px (default 220)
 *  minHeight  – minimum height in px (default auto)
 */
export const BaseNode = ({
  id,
  label,
  color = 'var(--accent)',
  icon = '◈',
  inputs = [],
  outputs = [],
  children,
  minWidth = 220,
  style = {},
}) => {
  // Distribute handles evenly along the edge
  const getHandleTop = (index, total) => {
    if (total === 1) return '50%';
    const step = 100 / (total + 1);
    return `${step * (index + 1)}%`;
  };

  return (
    <div
      className="vs-node"
      style={{
        minWidth,
        background: 'var(--bg-node)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-node)',
        overflow: 'visible',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        ...style,
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 14px 8px',
          borderBottom: '1px solid var(--border)',
          background: `linear-gradient(135deg, ${color}18 0%, transparent 100%)`,
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
        }}
      >
        <span
          style={{
            width: 26,
            height: 26,
            borderRadius: 6,
            background: `${color}22`,
            border: `1px solid ${color}44`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            flexShrink: 0,
          }}
        >
          {icon}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 12,
            fontWeight: 700,
            color: color,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </span>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: '12px 14px 14px', position: 'relative' }}>
        {children}
      </div>

      {/* ── Input Handles (left) ── */}
      {inputs.map(({ id: hid, label: hlabel, color: hcolor }, i) => (
        <div key={hid}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${hid}`}
            style={{
              top: getHandleTop(i, inputs.length),
              background: hcolor || color,
            }}
          />
          {hlabel && (
            <span
              style={{
                position: 'absolute',
                left: 14,
                top: getHandleTop(i, inputs.length),
                transform: 'translateY(-50%)',
                fontSize: 10,
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              {hlabel}
            </span>
          )}
        </div>
      ))}

      {/* ── Output Handles (right) ── */}
      {outputs.map(({ id: hid, label: hlabel, color: hcolor }, i) => (
        <div key={hid}>
          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-${hid}`}
            style={{
              top: getHandleTop(i, outputs.length),
              background: hcolor || color,
            }}
          />
          {hlabel && (
            <span
              style={{
                position: 'absolute',
                right: 14,
                top: getHandleTop(i, outputs.length),
                transform: 'translateY(-50%)',
                fontSize: 10,
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                textAlign: 'right',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              {hlabel}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

/* ── Shared sub-components used inside node bodies ── */

export const NodeField = ({ label, children }) => (
  <div style={{ marginBottom: 10 }}>
    {label && (
      <label
        style={{
          display: 'block',
          fontSize: 10,
          color: 'var(--text-muted)',
          marginBottom: 4,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </label>
    )}
    {children}
  </div>
);

const inputBase = {
  width: '100%',
  background: 'var(--bg-surface)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-sm)',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
  padding: '6px 8px',
  outline: 'none',
  transition: 'border-color 0.15s',
};

export const NodeInput = ({ value, onChange, placeholder, style = {} }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{ ...inputBase, ...style }}
    onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
  />
);

export const NodeSelect = ({ value, onChange, options, style = {} }) => (
  <select
    value={value}
    onChange={onChange}
    style={{
      ...inputBase,
      cursor: 'pointer',
      appearance: 'none',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%238b8fa8'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 8px center',
      paddingRight: 24,
      ...style,
    }}
    onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
  >
    {options.map((o) =>
      typeof o === 'string' ? (
        <option key={o} value={o}>{o}</option>
      ) : (
        <option key={o.value} value={o.value}>{o.label}</option>
      )
    )}
  </select>
);

export const NodeTextarea = ({ value, onChange, placeholder, style = {} }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={3}
    style={{
      ...inputBase,
      resize: 'vertical',
      lineHeight: 1.5,
      ...style,
    }}
    onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
  />
);

export const NodeInfoRow = ({ label, value, color }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{label}</span>
    <span style={{ fontSize: 11, color: color || 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{value}</span>
  </div>
);
