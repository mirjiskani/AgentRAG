import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/header";
import DocumentList from "../components/dashboard/DocumentsPanel";
import ChatWindow from "../components/dashboard/ChatPanel";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header onToggleSidebar={() => {}} />

        <main className="flex-1 p-6">
          <div className="grid grid-cols-12 gap-6 h-full">
            <div className="col-span-4">
              <DocumentList />
            </div>

            <div className="col-span-8">
              <ChatWindow />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}