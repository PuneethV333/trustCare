import { useQuery } from "@tanstack/react-query";
import { getUserApi } from "../api/user.api";

export const useGetUser = (id: string) =>
    useQuery({
        queryKey: ["user", id],
        queryFn: () => getUserApi(id),
        enabled:!!id
    })