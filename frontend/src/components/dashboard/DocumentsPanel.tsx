import { FileText,Search } from "lucide-react";

const documents = [
  {
    id: 1,
    name: "NestJS Guide.pdf",
    status: "READY",
  },
  {
    id: 2,
    name: "OpenAI Docs.pdf",
    status: "PROCESSING",
  },
  {
    id: 3,
    name: "OpenAI Docs.pdf",
    status: "PROCESSING",
  },
  {
    id: 4,
    name: "OpenAI Docs.pdf",
    status: "PROCESSING",
  },
  {
    id: 5,
    name: "OpenAI Docs.pdf",
    status: "PROCESSING",
  },
  {
    id: 6,
    name: "CV.pdf",
    status: "READY",
  },{
    id: 7,
    name: "Education Credential.pdf",
    status: "PENDING",
  },
  {
    id: 8,
    name: "OpenAI Docs.pdf",
    status: "PROCESSING",
  },{
    id: 9,
    name: "OpenAI Docs.pdf",
    status: "PROCESSING",
  },
  {
    id: 10,
    name: "OpenAI Docs.pdf",
    status: "PROCESSING",
  },
];

export default function DocumentList() {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 h-full">
      <div className="p-4 border-b-2 border-gray-200">
        {/* <h2 className="font-semibold">
          Documents
        </h2> */}
        <div className="flex gap-3">
        <input placeholder="Search documents..." className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />  
        <select className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Filter by status</option>
          <option value="ALL">All</option>
          <option value="READY">Ready</option>
          <option value="PROCESSING">Processing</option>
        </select>
        <button
          className="bg-indigo-100 text-white px-4 rounded-lg hover:bg-indigo-100 cursor-pointer transition"
        >
          <Search size={30} className="text-gray-500" />
        </button>
        </div>

      </div>

      <div className="p-4 space-y-3 overflow-y-auto h-[70vh]">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 cursor-pointer transition hover:bg-gray-100 flex justify-between items-center"
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <FileText size={20} />

                <div>
                  <h3 className="font-medium">
                    {doc.name}
                  </h3>
                </div>
              </div>

              <span
                className={`text-md px-4 py-1 mx-2 rounded-full h-full ${
                  doc.status === "READY"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {doc.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}