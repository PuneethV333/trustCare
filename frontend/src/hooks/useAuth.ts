import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { completeOnBoarding, getMeApi, joinAsHelperApi, signUpApi } from "../api/auth.api";
import { createMaid, SignUpPayload } from "../types/user.types";
import { Auth } from "../config/firebase.config";

export const useGetMe = () =>
    useQuery({
        queryFn: getMeApi,
        queryKey: ["me"],
        enabled: !!Auth.currentUser,
        retry: false,
    })

export const useSignUp = () =>
    useMutation({
        mutationFn: (data: SignUpPayload) => signUpApi(data),
    })

export const useJoinAsHelper = () =>
    useMutation({
        mutationFn: (data: SignUpPayload) => joinAsHelperApi(data),
    })

export const useCompleteOnBoarding = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(data:createMaid) => completeOnBoarding(data),
        onSuccess:(res) => {
            queryClient.setQueryData(["me"],res)
        }
    })
}