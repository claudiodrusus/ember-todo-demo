"use client";

import { useState } from "react";

// Hardcoded for now - in production, use a stable tunnel URL or your own domain
const WEBHOOK_URL = "https://mattress-suddenly-added-ministers.trycloudflare.com/feedback";

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page_path: window.location.pathname,
          page_url: window.location.href,
          page_title: document.title,
          type: formData.get("type"),
          title: formData.get("title"),
          description: formData.get("description"),
          timestamp: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(() => {
          setIsOpen(false);
          setStatus("idle");
          form.reset();
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-blue-600 text-white text-2xl shadow-lg hover:bg-blue-700 hover:scale-110 transition-all z-[99999] flex items-center justify-center"
        aria-label="Send feedback"
      >
        💬
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100000] p-4"
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        >
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Send Feedback</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3 p-2 bg-gray-100 rounded text-sm text-gray-600">
                <strong>Page:</strong> {typeof window !== "undefined" ? window.location.pathname : ""}
              </div>

              <select
                name="type"
                className="w-full p-3 mb-3 border border-gray-200 rounded-lg bg-white"
                defaultValue="improvement"
              >
                <option value="bug">🐛 Bug Report</option>
                <option value="feature">✨ Feature Request</option>
                <option value="improvement">📈 Improvement</option>
                <option value="ui">🎨 UI/UX Issue</option>
              </select>

              <input
                name="title"
                placeholder="Brief title..."
                className="w-full p-3 mb-3 border border-gray-200 rounded-lg"
                required
              />

              <textarea
                name="description"
                placeholder="Describe in detail..."
                className="w-full p-3 mb-3 border border-gray-200 rounded-lg min-h-[120px] resize-y"
                required
              />

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex-1 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {status === "sending" ? "Sending..." : "Submit"}
                </button>
              </div>

              {status === "success" && (
                <p className="mt-3 text-center text-green-600 font-medium">
                  ✓ Sent! AI is working on it.
                </p>
              )}
              {status === "error" && (
                <p className="mt-3 text-center text-red-600 font-medium">
                  ✗ Failed to send. Try again.
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
