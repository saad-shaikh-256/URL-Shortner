import React, { useState } from "react";
import {
  HiOutlineLink,
  HiOutlineClipboardCopy,
  HiCheck,
  HiOutlineCog,
} from "react-icons/hi";
import { shortenUrl } from "../services/api";

const ShortenerForm = () => {
  const [input, setInput] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await shortenUrl(input, customCode);
      setResult(data);
      setInput("");
      setCustomCode("");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 px-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <HiOutlineLink className="h-5 w-5 text-neutral-400 group-focus-within:text-primary-500" />
          </div>
          <input
            type="text"
            required
            placeholder="Paste your link (e.g. youtube.com)"
            className="block w-full pl-12 pr-32 py-4 bg-white border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:outline-none shadow-xl shadow-neutral-100 transition-all text-neutral-800"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 px-6 bg-primary-600 text-white rounded-xl font-bold text-sm hover:bg-primary-700 disabled:bg-neutral-400 transition-all"
          >
            {loading ? "..." : "Shorten"}
          </button>
        </div>

        {/* Custom Alias Toggle */}
        <div className="flex flex-col items-start px-2">
          <button
            type="button"
            onClick={() => setShowCustom(!showCustom)}
            className="flex items-center gap-1 text-xs font-bold text-neutral-500 hover:text-primary-600 transition-colors"
          >
            <HiOutlineCog className={showCustom ? "animate-spin-slow" : ""} />
            {showCustom ? "Hide Custom Alias" : "Add Custom Alias (Optional)"}
          </button>

          {showCustom && (
            <div className="mt-2 w-full animate-in fade-in slide-in-from-top-2">
              <input
                type="text"
                placeholder="e.g. my-awesome-link"
                className="w-full px-4 py-2 bg-neutral-100 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
              />
            </div>
          )}
        </div>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl text-error text-sm font-medium">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-8 p-6 bg-white border border-primary-100 rounded-2xl shadow-lg animate-in zoom-in-95 duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="overflow-hidden">
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">
                Ready to share
              </p>
              <a
                href={result.shortUrl}
                target="_blank"
                rel="noreferrer"
                className="text-lg font-bold text-primary-600 break-all"
              >
                {result.shortUrl}
              </a>
            </div>
            <button
              onClick={copyToClipboard}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                copied
                  ? "bg-success text-white"
                  : "bg-primary-50 text-primary-700 hover:bg-primary-100"
              }`}
            >
              {copied ? <HiCheck /> : <HiOutlineClipboardCopy />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortenerForm;
