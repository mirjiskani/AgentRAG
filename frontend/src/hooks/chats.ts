import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const useGetChatHistory = (documentId: number | null) => {
	return useQuery<any[]>({
		queryKey: ['chat', 'history', documentId],
		enabled: !!documentId,
		queryFn: async () => {
			const res = await api.post('/chat/get-history', { documentId });
			return res.data?.data || [];
		},
	});
};

export const useSendMessage = () => {
	return useMutation<any, Error, { documentId: number; question: string }>(
		{
			mutationFn: async ({ documentId, question }: { documentId: number; question: string }) => {
				const res = await api.post('/chat/get-answer', { documentId, question });
				return res.data?.data || res.data;
			},
		}
	);
};

export default {};
