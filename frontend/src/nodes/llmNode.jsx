import { useState } from 'react';
import { BaseNode, NodeField, NodeSelect, NodeInfoRow } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4o');
  const [temperature, setTemperature] = useState(data?.temperature || '0.7');

  return (
    <BaseNode
      id={id}
      label="LLM"
      color="var(--accent)"
      icon="✦"
      inputs={[
        { id: 'system', label: 'system' },
        { id: 'prompt', label: 'prompt' },
      ]}
      outputs={[{ id: 'response', label: 'response' }]}
      minWidth={240}
    >
      <NodeField label="Model">
        <NodeSelect
          value={model}
          onChange={(e) => setModel(e.target.value)}
          options={['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'claude-3-5-sonnet', 'claude-3-haiku', 'gemini-1.5-pro']}
        />
      </NodeField>
      <NodeField label="Temperature">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            style={{ flex: 1, accentColor: 'var(--accent)' }}
          />
          <span style={{ fontSize: 11, color: 'var(--text-secondary)', width: 28, textAlign: 'right' }}>
            {temperature}
          </span>
        </div>
      </NodeField>
      <NodeInfoRow label="Context window" value="128k" color="var(--accent)" />
    </BaseNode>
  );
};
