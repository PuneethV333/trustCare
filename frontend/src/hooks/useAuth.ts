import { useMutation, useQuery } from "@tanstack/react-query";
import { getMeApi, signUpApi } from "../api/auth.api";
import { SignUpPayload } from "../types/user.types";
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