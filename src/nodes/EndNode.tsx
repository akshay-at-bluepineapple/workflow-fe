import { Handle, Position } from '@xyflow/react';

const EndNode = ({ data, id }: any) => {
  return (
    <div className="bg-red-100 border-2 border-red-400 rounded-xl shadow-md w-56 h-14 p-3">
      <button
        onClick={() => data.onDelete?.(id)}
        className="absolute top-1 right-1 text-[8px] text-red-600 hover:text-red-800 pr-1 pt-1"
      >
        ✖
      </button>
      <Handle type="target" position={Position.Top} />

      <div className="flex items-center justify-center">
        <p className="text-sm font-semibold text-green-900">{data.label || 'End'}</p>
      </div>
    </div>
  );
};

export default EndNode;
