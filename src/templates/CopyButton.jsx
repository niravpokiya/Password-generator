import { useRef, useState } from 'react';

function CopyButton({ textToCopy, Reference }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  const handleCopy = () => {
    Reference.current?.select()
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleCopy}
        className="shrink-0 z-10 inline-flex items-center py-3 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border border-blue-700 dark:border-blue-600 hover:border-blue-800 dark:hover:border-blue-700"
        type="button"
      >
        {copied ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 16 12">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5.917 5.724 10.5 15 1.5"
            />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 18 20">
            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
          </svg>
        )}
      </button>
      <div
        className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded-lg transition-opacity duration-300 ${
          copied ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {copied ? 'Copied!' : 'Copy link'}
      </div>
    </div>
  );
}

export default CopyButton;
