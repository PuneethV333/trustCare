import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptRequestApi, getMaidsApi, getMyRequestsApi, getTopMaidsApi, rejectRequestApi } from "../api/maid.api";
import { requestType } from "../types/user.types";

export const useGetTopMaids = () =>
    useQuery({
        queryKey: ["top", "maid"],
        queryFn: getTopMaidsApi,
        refetchOnWindowFocus: false,
        staleTime: 3000
    })


export const useGetMaids = () =>
    useQuery({
        queryKey: ["maids"],
        queryFn: getMaidsApi,
    })

export const useGetMyRequests = () =>
    useQuery({
        queryKey: ["maid", "request"],
        queryFn: getMyRequestsApi
    })


export const useAcceptRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: acceptRequestApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["maid", "request"] });
        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ["maid", "request"] });
        },
    });
};

export const useRejectRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: rejectRequestApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["maid", "request"] });
        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ["maid", "request"] });
        },
    });
};