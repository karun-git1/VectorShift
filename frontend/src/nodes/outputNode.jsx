import { useState } from 'react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      label="Output"
      color="var(--accent-rose)"
      icon="↴"
      inputs={[{ id: 'value', label: 'value' }]}
      outputs={[]}
    >
      <NodeField label="Name">
        <NodeInput value={name} onChange={(e) => setName(e.target.value)} placeholder="output_name" />
      </NodeField>
      <NodeField label="Type">
        <NodeSelect value={outputType} onChange={(e) => setOutputType(e.target.value)} options={['Text', 'Image', 'File']} />
      </NodeField>
    </BaseNode>
  );
};
