import { useState } from 'react';
import { BaseNode, NodeField, NodeInput, NodeSelect, NodeTextarea, NodeInfoRow } from './BaseNode';

/* ── 1. API Request Node ───────────────────────────────────────────────────── */
export const ApiNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || 'https://api.example.com/');

  return (
    <BaseNode
      id={id}
      label="API Request"
      color="var(--accent-orange)"
      icon="⇄"
      inputs={[{ id: 'body', label: 'body' }, { id: 'headers', label: 'headers' }]}
      outputs={[{ id: 'response', label: 'response' }, { id: 'status', label: 'status' }]}
      minWidth={260}
    >
      <NodeField label="Method">
        <NodeSelect
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          options={['GET', 'POST', 'PUT', 'PATCH', 'DELETE']}
        />
      </NodeField>
      <NodeField label="URL">
        <NodeInput value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://" />
      </NodeField>
    </BaseNode>
  );
};

/* ── 2. Data Transform Node ────────────────────────────────────────────────── */
export const TransformNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'JSON Parse');
  const [jqFilter, setJqFilter] = useState(data?.jqFilter || '.');

  return (
    <BaseNode
      id={id}
      label="Transform"
      color="var(--accent-purple)"
      icon="⟳"
      inputs={[{ id: 'input', label: 'input' }]}
      outputs={[{ id: 'output', label: 'output' }, { id: 'error', label: 'error' }]}
      minWidth={240}
    >
      <NodeField label="Operation">
        <NodeSelect
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          options={['JSON Parse', 'JSON Stringify', 'Base64 Encode', 'Base64 Decode', 'JQ Filter', 'Uppercase', 'Lowercase', 'Trim']}
        />
      </NodeField>
      {operation === 'JQ Filter' && (
        <NodeField label="Filter">
          <NodeInput value={jqFilter} onChange={(e) => setJqFilter(e.target.value)} placeholder=".data.items[]" />
        </NodeField>
      )}
    </BaseNode>
  );
};

/* ── 3. Conditional / Router Node ─────────────────────────────────────────── */
export const ConditionNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'input > 0');

  return (
    <BaseNode
      id={id}
      label="Condition"
      color="var(--accent-3)"
      icon="⑂"
      inputs={[{ id: 'value', label: 'value' }]}
      outputs={[
        { id: 'true', label: 'true', color: 'var(--accent-green)' },
        { id: 'false', label: 'false', color: 'var(--accent-rose)' },
      ]}
      minWidth={240}
    >
      <NodeField label="Condition">
        <NodeInput
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="input === 'yes'"
        />
      </NodeField>
      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <span style={{ fontSize: 10, color: 'var(--accent-green)' }}>▶ True branch</span>
        <span style={{ fontSize: 10, color: 'var(--accent-rose)' }}>▶ False branch</span>
      </div>
    </BaseNode>
  );
};

/* ── 4. Database Query Node ────────────────────────────────────────────────── */
export const DatabaseNode = ({ id, data }) => {
  const [dbType, setDbType] = useState(data?.dbType || 'PostgreSQL');
  const [query, setQuery] = useState(data?.query || 'SELECT * FROM table LIMIT 10;');

  return (
    <BaseNode
      id={id}
      label="Database"
      color="#14b8a6"
      icon="⊞"
      inputs={[{ id: 'params', label: 'params' }]}
      outputs={[{ id: 'rows', label: 'rows' }, { id: 'count', label: 'count' }]}
      minWidth={260}
    >
      <NodeField label="Engine">
        <NodeSelect
          value={dbType}
          onChange={(e) => setDbType(e.target.value)}
          options={['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'Redis']}
        />
      </NodeField>
      <NodeField label="Query">
        <NodeTextarea value={query} onChange={(e) => setQuery(e.target.value)} placeholder="SELECT ..." />
      </NodeField>
    </BaseNode>
  );
};

/* ── 5. Note / Annotation Node ─────────────────────────────────────────────── */
export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || 'Add a note...');
  const [color, setColor] = useState(data?.color || 'yellow');

  const colorMap = {
    yellow: { bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.25)', text: '#fbbf24' },
    blue:   { bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.25)', text: '#6366f1' },
    green:  { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)', text: '#10b981' },
    red:    { bg: 'rgba(244,63,94,0.08)',  border: 'rgba(244,63,94,0.25)',  text: '#f43f5e' },
  };

  const c = colorMap[color] || colorMap.yellow;

  return (
    <BaseNode
      id={id}
      label="Note"
      color={c.text}
      icon="✎"
      inputs={[]}
      outputs={[]}
      minWidth={200}
      style={{ background: c.bg, borderColor: c.border }}
    >
      <NodeField label="Color">
        <div style={{ display: 'flex', gap: 6 }}>
          {Object.entries(colorMap).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setColor(key)}
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: val.text,
                border: color === key ? '2px solid white' : '2px solid transparent',
                cursor: 'pointer',
                padding: 0,
              }}
            />
          ))}
        </div>
      </NodeField>
      <NodeField>
        <NodeTextarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note..." />
      </NodeField>
    </BaseNode>
  );
};
