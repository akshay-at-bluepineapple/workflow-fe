import type { Node } from '@xyflow/react';

export type NodeData = {
    title: string;
    description?: string;
    onDelete?: (id: string) => void;
    onChange?: (id: string, field: string, value: string) => void;
};

export type PositionLoggerNode = Node<{ label: string }, 'position-logger'>;
export type InputTypes = Node<{ label: string }, 'input-node'>;
export type StartNode = Node<{ label: string }, 'start-node'>;
export type EndNode = Node<{ label: string }, 'end-node'>;
export type AppNode = Node<NodeData, 'input-node' | 'start-node' | 'end-node'>;