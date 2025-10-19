
import React, { useState, useCallback } from 'react';
import { ClipboardIcon } from './ClipboardIcon';

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

  const contentToCopy = Array.isArray(content) ? content.join('\n') : content;
  const contentToDisplay = Array.isArray(content) ? (
    <ul className="list-disc list-inside space-y-1">
      {content.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  ) : (
    <p className="whitespace-pre-wrap">{content}</p>
  );

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(contentToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [contentToCopy]);

  return (
    <div className={`bg-slate-900/70 border rounded-lg p-4 relative group transition-colors duration-300 ${borderColor}`}>
      <h3 className={`text-lg font-semibold mb-2 ${titleColor}`}>{title}</h3>
      <div className="text-slate-300 pr-2">
        {contentToDisplay}
      </div>
      <button 
        onClick={handleCopy}
        className="absolute top-3 left-3 p-1.5 bg-slate-700 rounded-md text-slate-400 hover:text-white hover:bg-slate-600 transition-all duration-200 opacity-0 group-hover:opacity-100"
        aria-label="Copy to clipboard"
        >
         {copied ? (
            <span className="text-xs">تم النسخ!</span>
         ) : (
            <ClipboardIcon />
         )}
      </button>
    </div>
  );
};
