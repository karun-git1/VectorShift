import { DraggableNode } from './draggableNode';

const NODE_DEFS = [
  // Original 4
  { type: 'customInput',  label: 'Input',     color: 'var(--accent-green)',  icon: '↳' },
  { type: 'llm',          label: 'LLM',        color: 'var(--accent)',        icon: '✦' },
  { type: 'customOutput', label: 'Output',     color: 'var(--accent-rose)',   icon: '↴' },
  { type: 'text',         label: 'Text',       color: 'var(--accent-2)',      icon: 'T' },
  // 5 new custom nodes
  { type: 'api',          label: 'API',        color: 'var(--accent-orange)', icon: '⇄' },
  { type: 'transform',    label: 'Transform',  color: 'var(--accent-purple)', icon: '⟳' },
  { type: 'condition',    label: 'Condition',  color: 'var(--accent-3)',      icon: '⑂' },
  { type: 'database',     label: 'Database',   color: '#14b8a6',              icon: '⊞' },
  { type: 'note',         label: 'Note',       color: '#fbbf24',              icon: '✎' },
];

export const PipelineToolbar = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        padding: '0 20px',
        height: 56,
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border)',
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginRight: 24,
          paddingRight: 24,
          borderRight: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 800,
            color: 'white',
            fontFamily: 'var(--font-display)',
          }}
        >
          V
        </div>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 14,
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.3px',
          }}
        >
          VectorShift
        </span>
      </div>

      {/* Section label */}
      <span
        style={{
          fontSize: 10,
          color: 'var(--text-muted)',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          marginRight: 12,
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
        }}
      >
        Nodes
      </span>

      {/* Draggable nodes */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {NODE_DEFS.map((n) => (
          <DraggableNode key={n.type} {...n} />
        ))}
      </div>
    </div>
  );
};
