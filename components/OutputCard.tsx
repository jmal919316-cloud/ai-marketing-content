import React, { useState, useCallback } from 'react';
import { ClipboardIcon } from './ClipboardIcon.tsx';

interface OutputCardProps {
  title: string;
  content: string | string[];
  colorIndex: number;
}

const BORDER_COLORS = [
  'border-cyan-500/80',
  'border-fuchsia-500/80',
  'border-sky-500/80',
  'border-emerald-500/80',
  'border-amber-500/80',
];
const TITLE_COLORS = [
  'text-cyan-400',
  'text-fuchsia-400',
  'text-sky-400',
  'text-emerald-400',
  'text-amber-400',
];


export const OutputCard: React.FC<OutputCardProps> = ({ title, content, colorIndex }) => {
  const [copied, setCopied] = useState(false);
  
  const borderColor = BORDER_COLORS[colorIndex % BORDER_COLORS.length];
  const titleColor = TITLE_COLORS[colorIndex % TITLE_COLORS.length];

  const contentToCopy = Array.isArray(content) ? content.join('\n- ') : content;
  const contentToDisplay = Array.isArray(content) ? (
    <ul className="list-disc list-inside space-y-1">
      {content.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  ) : (
    <p className="whitespace-pre-wrap">{content}</p>
  );

  const handleCopy = useCallback(() => {
    if(!contentToCopy) return;
    navigator.clipboard.writeText(contentToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [contentToCopy]);

  return (
    <div className={`bg-slate-900/70 border rounded-lg p-4 relative group transition-colors duration-300 ${borderColor}`}>
      <div className="flex justify-between items-start">
        <h3 className={`text-lg font-semibold mb-2 ${titleColor}`}>{title}</h3>
        <button 
          onClick={handleCopy}
          className="p-1.5 bg-slate-700 rounded-md text-slate-400 hover:text-white hover:bg-slate-600 transition-all duration-200 opacity-0 group-hover:opacity-100"
          aria-label="Copy to clipboard"
          >
           {copied ? (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
               </svg>
           ) : (
              <ClipboardIcon />
           )}
        </button>
      </div>
      <div className="text-slate-300 pr-2">
        {contentToDisplay}
      </div>
    </div>
  );
};