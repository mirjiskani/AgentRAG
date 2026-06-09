import { FileText, Loader2, Plus, Trash2 } from "lucide-react";
import { useDeleteDocument, useGetDocuments, useUploadDocument } from "../../hooks/documents";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function DocumentList() {
  const { data: documents, isLoading, error } = useGetDocuments();
  const { mutateAsync: uploadDocument, isPending: isUploading } = useUploadDocument();
  const { mutateAsync: deleteDocument, isPending: isDeleting } = useDeleteDocument();
  const allowedFileTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch documents");
    }
  }, [error]);

  
  if (error) {
    return <div>Error loading documents.</div>;
  }


  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return; 
    try {
      const fileType = file.type;
      if (!allowedFileTypes.includes(fileType)) {
        toast.error("Invalid file type");
        return;
      }
      const result = await uploadDocument(file);
      if (result?.success) {
        toast.success("Document uploaded successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload document");
    }
  };

  const onDeleteDocument = async (documentId: number) => {
    try {
      const result = await deleteDocument(documentId);
      if (result?.success) {
        toast.success("Document deleted successfully");
      }else{
        toast.error(result?.message || "Failed to delete document");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete document");
    }
  };


  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 h-full">
      <div className="p-4 border-b-2 border-gray-200">
        <div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex cursor-pointer items-center justify-center gap-2 w-full mb-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-70"
          >
            {isUploading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Plus size={18} />
                Upload Document
              </>
            )}
          </button>
        </div>

        <div className="flex gap-3">
          <input placeholder="Search documents..." className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
          <select className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Filter by status</option>
            <option value="ALL">All</option>
            <option value="READY">Ready</option>
            <option value="PROCESSING">Processing</option>
          </select>
        </div>
      </div>

      <div className="p-4 space-y-3 overflow-y-auto h-[70vh]">
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <Loader2 size={24} className="animate-spin" />
          </div>
        )}
        {isDeleting && (
          <div className="flex items-center justify-center h-full">
            <Loader2 size={24} className="animate-spin" />
          </div>
        )}
        {!isLoading && !isDeleting && documents?.data.map((doc) => (
          
            <div className="flex justify-between items-center p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 cursor-pointer transition hover:bg-gray-100 " key={doc.id}>
              <div className="flex gap-3">
                <FileText size={20} />

                <div>
                  <h3 className="font-medium">
                    {doc.fileName}
                  </h3>
                </div>
              </div>

              <span
                className={`text-md px-4 py-1 mx-2 rounded-full h-full ${doc.status === "READY"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                  }`}
              >
                {/* {doc.status} */} Pending
              </span>
              <button
                onClick={() => onDeleteDocument(doc.id)}
                className="text-red-600 hover:text-red-800 cursor-pointer ml-auto"
              >
                <Trash2 size={20} />
              </button>
            </div>
        ))}
      </div>
    </div>
  );
}
