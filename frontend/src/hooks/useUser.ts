import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addRequestApi, getUserApi } from "../api/user.api";
import { addRequest } from "../types/user.types";

export const useGetUser = (id: string) =>
    useQuery({
        queryKey: ["user", id],
        queryFn: () => getUserApi(id),
        enabled: !!id
    })

export const useAddRequest = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: addRequest }) =>
            addRequestApi(id, data),
        mutationKey: ["add", "request"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["me"] })
        }
    })
}