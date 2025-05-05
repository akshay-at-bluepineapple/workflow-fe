'use client';
import { useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
  type Edge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { initialNodes, nodeTypes } from '../nodes';
import { initialEdges, edgeTypes } from '../edges';
import type { AppNode } from '../nodes/types';

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [edgeType, setEdgeType] = useState<'step' | 'default' | 'smoothstep'>('step');

  console.log("nodes", nodes)
  console.log("edges", edges)
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge({ ...connection, type: edgeType }, edges)),
    [setEdges, edgeType]
  );

  const onEdgeClick = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      event.stopPropagation();
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    },
    [setEdges]
  );

  const addNode = (title: string, type: AppNode['type']) => {
    const newNode: AppNode = {
      id: `${Date.now()}`,
      type,
      position: { x: Math.random() * 300, y: Math.random() * 300 },
      data: {
        title,
        description: '',
        onDelete: (idToRemove: string) => {
          setNodes((nds) => nds.filter((n) => n.id !== idToRemove));
          setEdges((eds) => eds.filter((e) => e.source !== idToRemove && e.target !== idToRemove));
        },
        onChange: (idToUpdate: string, field: string, value: string) => {
          setNodes((nds) =>
            nds.map((node) =>
              node.id === idToUpdate
                ? {
                  ...node,
                  data: {
                    ...node.data,
                    [field]: value,
                  },
                }
                : node
            )
          );
        },
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };


  const resetNode = () => {
    setNodes([])
    setEdges([])
  }

  useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        type: edgeType,
      }))
    );
  }, [edgeType, setEdges]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Tools</h2>

        <button
          onClick={() => addNode('Title', 'input-node')}
          className="w-full mb-2 bg-amber-300 hover:bg-amber-400 p-2 rounded"
        >
          Add Node
        </button>

        <button
          onClick={() => addNode('Start', 'start-node')}
          className="w-full mb-2 bg-green-300 hover:bg-green-400 p-2 rounded"
        >
          Add Start Node
        </button>

        <button
          onClick={() => addNode('End', 'end-node')}
          className="w-full mb-4 bg-red-300 hover:bg-red-400 p-2 rounded"
        >
          Add End Node
        </button>

        <button
          onClick={() => resetNode()}
          className="w-full mb-4 bg-blue-300 hover:bg-blue-400 p-2 rounded"
        >
          Reset
        </button>

        <label className="block mb-1 font-medium">Edge Type:</label>
        <select
          value={edgeType}
          onChange={(e) => setEdgeType(e.target.value as any)}
          className="w-full p-2 rounded border border-gray-300"
        >
          <option value="default">Default</option>
          <option value="step">Step</option>
          <option value="smoothstep">Smooth Step</option>
        </select>
      </div>

      {/* Flow Canvas */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeClick={onEdgeClick}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
