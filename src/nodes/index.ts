import type { NodeTypes } from '@xyflow/react';

import { PositionLoggerNode } from './PositionLoggerNode';
import InputTypes from './InputTypes';
import { AppNode } from './types';
import StartNode from './StartNode';
import EndNode from './EndNode';

export const initialNodes: AppNode[] = [];

export const nodeTypes = {
  'input-node': InputTypes,
  'start-node': StartNode,
  'end-node': EndNode
  // Add any of your custom nodes here!
};