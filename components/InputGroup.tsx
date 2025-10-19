
import React from 'react';

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export const InputGroup: React.FC<InputGroupProps> = ({ label, id, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">
        {label} {props.required && <span className="text-red-400">*</span>}
      </label>
      <input
        id={id}
        {...props}
        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200"
      />
    </div>
  );
};
