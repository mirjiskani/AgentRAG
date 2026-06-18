import { Send, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

interface ChatWindowProps {
  selectedDocumentId: number | null;
}

export default function ChatWindow({ selectedDocumentId }: ChatWindowProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (selectedDocumentId) {
      toast.success(`Document selected (ID: ${selectedDocumentId})`);
      // Call API to load chat history for this document
      loadChatHistory(selectedDocumentId);
    }
  }, [selectedDocumentId]);

  const loadChatHistory = async (documentId: number) => {
    try {
      const response = await api.post(`/chat/get-history`, {
        documentId: documentId,
      });
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        // Response is wrapped in data property
        const formattedMessages = response.data.data.map((msg: any) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content || msg.message || "",
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
      // Don't show error toast for history loading, it's optional
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    if (!selectedDocumentId) {
      toast.error("Please select a document first");
      return;
    }

    const userMessage = message.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await api.post(`/chat/get-answer`, {
        question: userMessage,
        documentId: selectedDocumentId,
      });

      setMessages((prev) => [...prev, { role: "assistant", content: response.data.response }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
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
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-3 rounded-xl max-w-lg flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-sm text-gray-600">Assistant is typing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t-2 border-gray-200 p-4">
        {!selectedDocumentId && (
          <div className="mb-3 text-sm text-amber-600 bg-amber-50 p-2 rounded-lg">
            ⚠️ Please select a document from the left panel to start chatting
          </div>
        )}
        <div className="flex gap-3">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={selectedDocumentId ? "Ask anything about your documents..." : "Select a document first..."}
            disabled={!selectedDocumentId || isLoading}
            className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />

          <button
            onClick={handleSendMessage}
            disabled={!selectedDocumentId || isLoading}
            className="bg-indigo-600 text-white px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
