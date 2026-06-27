import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addRequestApi, getMyRequestsApi, getUserApi, updateMeApi } from "../api/user.api";
import { addRequest, updateMeType } from "../types/user.types";
import { Auth } from "../config/firebase.config";

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

export const useGetMyRequests = () =>
    useQuery({
        queryKey: ["my", "requests"],
        queryFn: getMyRequestsApi,
        enabled: !!Auth.currentUser
    })

export const useUpdateMe = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: updateMeType) => updateMeApi(data),
        mutationKey: ["update", "me"],
        onSuccess: (res) => {
            queryClient.setQueryData(["me"], res)
        }
    })
}