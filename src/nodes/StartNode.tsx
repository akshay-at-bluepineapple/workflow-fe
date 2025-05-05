import { Handle, Position } from '@xyflow/react';

const StartNode = ({ data, id }: any) => {
  return (
    <div className="bg-green-200 border-2 border-green-500 rounded-xl w-56 h-14 flex items-center justify-center text-center shadow-md">
      <button
        onClick={() => data.onDelete?.(id)}
        className="absolute top-1 right-1 text-[8px] text-red-600 hover:text-red-800 pr-1 pt-1"
      >
        ✖
      </button>
      <Handle type="source" position={Position.Bottom} />
      <p className="text-sm font-semibold text-green-900">{data.label || 'Start'}</p>
    </div>
  );
};

export default StartNode;
