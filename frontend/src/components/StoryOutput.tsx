import { useState } from "react";

interface StoryOutputProps {
  story: string;
  onRegenerate: () => void;
  disabled: boolean;
}
function StoryOutput({ story, onRegenerate, disabled }: StoryOutputProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(story);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-md">
      <h2 className="text-lg font-medium mb-2">Your Story Prompt</h2>
      <div className="p-3 bg-white border border-gray-200 rounded-md mb-4">
        <p className="text-gray-800">{story}</p>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={copyToClipboard}
          className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {copied ? "Copied!" : "Copy to Clipboard"}
        </button>
        <button
          onClick={onRegenerate}
          disabled={disabled}
          className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          Regenerate
        </button>
      </div>
    </div>
  );
}

export default StoryOutput;
