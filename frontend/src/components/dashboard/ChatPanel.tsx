import { Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function ChatWindow() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage = message.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setMessage("");

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: "This is a placeholder response. Connect to your chat API here." }]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl flex flex-col h-[80vh]">
      <div className="border-b-2 border-gray-200 p-4">
        <h2 className="font-semibold text-lg">
          Document Assistant
        </h2>
        <p className="text-sm text-gray-500">
          Ask questions and get AI-powered answers from your documents
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`${msg.role === "user" ? "bg-indigo-600 text-white" : "bg-gray-100"} px-4 py-3 rounded-xl max-w-lg`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t-2 border-gray-200 p-4">
        <div className="flex gap-3">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your documents..."
            className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-indigo-500"
          />

          <button
            onClick={handleSendMessage}
            className="bg-indigo-600 text-white px-4 rounded-lg hover:bg-indigo-700"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
