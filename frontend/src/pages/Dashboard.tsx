import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";
import DocumentList from "../components/dashboard/DocumentsPanel";
import ChatWindow from "../components/dashboard/ChatPanel";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header onToggleSidebar={() => {}} />

        <main className="flex-1 overflow-auto p-3 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6 h-full">
            <div className="col-span-1 md:col-span-2 lg:col-span-4">
              <DocumentList />
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-8">
              <ChatWindow />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}