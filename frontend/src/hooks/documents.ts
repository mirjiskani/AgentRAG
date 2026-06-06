import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { uploadDocument } from "../services/document";

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
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["documents"],
    queryFn: () => queryClient.getQueryData(["documents"]),
  });
};
