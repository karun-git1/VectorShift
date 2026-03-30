import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode, NodeField } from './BaseNode';

// Extract valid JS variable names from {{ varName }} patterns
const extractVariables = (text) => {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const vars = [];
  const seen = new Set();
  let match;
  while ((match = regex.exec(text)) !== null) {
    const varName = match[1];
    if (!seen.has(varName)) {
      seen.add(varName);
      vars.push(varName);
    }
  }
  return vars;
};

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  const [size, setSize] = useState({ width: 240, height: 'auto' });

  const variables = extractVariables(text);

  // Auto-resize textarea as content grows
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';

    // Widen node based on longest line
    const lines = text.split('\n');
    const longest = Math.max(...lines.map((l) => l.length));
    const newWidth = Math.max(240, Math.min(500, 180 + longest * 7));
    setSize({ width: newWidth });
  }, [text]);

  // Distribute variable handles vertically
  const getVarTop = (index, total) => {
    if (total === 1) return '50%';
    const step = 100 / (total + 1);
    return `${step * (index + 1)}%`;
  };

  return (
    <div style={{ position: 'relative', width: size.width }}>
      <BaseNode
        id={id}
        label="Text"
        color="var(--accent-2)"
        icon="T"
        inputs={[]}
        outputs={[{ id: 'output', label: 'output' }]}
        style={{ width: '100%' }}
      >
        <NodeField label="Content">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text... use {{variable}} for inputs"
            rows={3}
            style={{
              width: '100%',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              padding: '6px 8px',
              outline: 'none',
              resize: 'none',
              lineHeight: 1.6,
              overflow: 'hidden',
              transition: 'border-color 0.15s',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent-2)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
          />
        </NodeField>

        {variables.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
            {variables.map((v) => (
              <span
                key={v}
                style={{
                  fontSize: 10,
                  padding: '2px 6px',
                  background: 'rgba(6,182,212,0.1)',
                  border: '1px solid rgba(6,182,212,0.25)',
                  borderRadius: 4,
                  color: 'var(--accent-2)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        )}
      </BaseNode>

      {/* Dynamic variable handles on the left */}
      {variables.map((varName, i) => (
        <div key={varName}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${varName}`}
            style={{
              top: getVarTop(i, variables.length),
              background: 'var(--accent-2)',
              left: -5,
              width: 10,
              height: 10,
              border: '2px solid var(--bg-node)',
              borderRadius: '50%',
            }}
          />
          <span
            style={{
              position: 'absolute',
              left: 12,
              top: getVarTop(i, variables.length),
              transform: 'translateY(-50%)',
              fontSize: 10,
              color: 'var(--accent-2)',
              fontFamily: 'var(--font-mono)',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {varName}
          </span>
        </div>
      ))}
    </div>
  );
};
