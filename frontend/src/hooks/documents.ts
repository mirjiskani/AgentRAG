import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { uploadDocument, getDocuments, deleteDocument } from "../services/document";

export const useUploadDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
};

export const useGetDocuments = () => {
  return useQuery({
    queryKey: ["documents"],
    queryFn: getDocuments,
  });
};

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (documentId: number) => deleteDocument(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
};