import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Settings,
  Bot,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Documents",
    icon: FileText,
  },
  {
    name: "Chats",
    icon: MessageSquare,
  },
  {
    name: "Settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white">
      <div className="flex items-center gap-2 p-6 border-b">
        <Bot className="text-indigo-600" />
        <h1 className="font-bold text-xl">AgentRAG</h1>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-gray-100 transition cursor-pointer"
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}