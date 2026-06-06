import { Send } from "lucide-react";
import { useState } from "react";

export default function ChatWindow() {
  const [message, setMessage] = useState("");

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl flex flex-col h-[80vh]">
      <div className="border-b-2 border-gray-200 p-4">
        <h2 className="font-semibold">
          Chat With Documents
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="flex justify-end">
          <div className="bg-indigo-600 text-white px-4 py-3 rounded-xl max-w-lg">
            What is RAG?
          </div>
        </div>

        <div className="flex justify-start">
          <div className="bg-gray-100 px-4 py-3 rounded-xl max-w-xl">
            RAG (Retrieval-Augmented Generation) combines
            retrieval systems with LLMs to provide accurate,
            context-aware answers from external knowledge.
          </div>
        </div>
      </div>

      <div className="border-t-2 border-gray-200 p-4">
        <div className="flex gap-3">
          <input
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Ask anything about your documents..."
            className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-indigo-500"
          />

          <button
            className="bg-indigo-600 text-white px-4 rounded-lg hover:bg-indigo-700"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}