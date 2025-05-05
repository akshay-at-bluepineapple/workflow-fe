import { Handle, Position, NodeProps } from "@xyflow/react";
import React from "react";

const InputTypes = ({ id, data }: any) => {
    console.log("id",id)
    const handleChange = (field: 'title' | 'description', value: string) => {
        data.onChange?.(id, field, value);
    };
    return (
        <div className="bg-white border border-gray-300 rounded-xl shadow-md w-56 p-3">
            <button
                onClick={() => data.onDelete?.(id)}
                className="absolute top-1 right-1 text-[8px] text-red-600 hover:text-red-800 pr-1 pt-1"
            >
                ✖
            </button>
            <Handle type="target" position={Position.Top} id="top-target" />
            <Handle type="source" position={Position.Bottom} id="bottom-source" />
            <Handle type="source" position={Position.Right} id="right-source" />
            <Handle type="target" position={Position.Left} id="left-target" />

            <div className="mb-2">
                <input
                    type="text"
                    placeholder="Title"
                    className="w-full font-semibold text-gray-800 border-b border-gray-200 focus:outline-none focus:border-gray-400"
                    onChange={(e) => handleChange('title', e.target.value)}
                    value={data.title}
                />
            </div>
            <div className="mb-2">
                <textarea
                    rows={4}
                    placeholder="Description"
                    className="w-full resize-none text-sm text-gray-700 border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                    value={data.description || ''}
                    onChange={(e) => handleChange('description', e.target.value)}
                />
            </div>

        </div>
    );
};

export default InputTypes;
