import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

/* ── Alert Modal ─────────────────────────────────────────────────────────── */
const ResultModal = ({ result, onClose }) => {
  if (!result) return null;
  return (
    <div className="vs-alert-overlay" onClick={onClose}>
      <div className="vs-alert-box" onClick={(e) => e.stopPropagation()}>
        <div className="vs-alert-title">Pipeline Analysis</div>

        <div className="vs-alert-row">
          <span className="vs-alert-label">Nodes</span>
          <span className="vs-alert-value" style={{ color: 'var(--accent-2)' }}>
            {result.num_nodes}
          </span>
        </div>

        <div className="vs-alert-row">
          <span className="vs-alert-label">Edges</span>
          <span className="vs-alert-value" style={{ color: 'var(--accent-purple)' }}>
            {result.num_edges}
          </span>
        </div>

        <div className="vs-alert-row">
          <span className="vs-alert-label">Directed Acyclic Graph</span>
          <span className={`vs-alert-badge ${result.is_dag}`}>
            {result.is_dag ? '✓ Valid DAG' : '✗ Contains Cycle'}
          </span>
        </div>

        <button className="vs-alert-close" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
};

/* ── Submit Button ───────────────────────────────────────────────────────── */
export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (nodes.length === 0) {
      setError('Add at least one node to the canvas first.');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message.includes('fetch') ? 'Cannot reach backend. Is it running on port 8000?' : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          padding: '12px 20px',
          borderTop: '1px solid var(--border)',
          background: 'var(--bg-surface)',
          flexShrink: 0,
        }}
      >
        {/* Pipeline stats preview */}
        <div style={{ display: 'flex', gap: 16, marginRight: 8 }}>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{nodes.length}</span> nodes
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{edges.length}</span> edges
          </span>
        </div>

        {error && (
          <span
            style={{
              fontSize: 11,
              color: 'var(--accent-rose)',
              background: 'rgba(244,63,94,0.1)',
              border: '1px solid rgba(244,63,94,0.2)',
              padding: '4px 10px',
              borderRadius: 6,
            }}
          >
            {error}
          </span>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '9px 22px',
            background: loading ? 'var(--bg-elevated)' : 'var(--accent)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            color: loading ? 'var(--text-muted)' : 'white',
            fontFamily: 'var(--font-display)',
            fontSize: 13,
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.15s',
            letterSpacing: '0.2px',
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.background = '#4f52d9';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(99,102,241,0.4)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = loading ? 'var(--bg-elevated)' : 'var(--accent)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {loading ? (
            <>
              <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>◌</span>
              Analyzing...
            </>
          ) : (
            <>▶ Analyze Pipeline</>
          )}
        </button>
      </div>

      <ResultModal result={result} onClose={() => setResult(null)} />
    </>
  );
};
