import { useQuery } from "@tanstack/react-query";
import { getTopMaidsApi } from "../api/maid.api";

export const useGetTopMaids = () => 
    useQuery({
        queryKey:["top","maid"],
        queryFn:getTopMaidsApi,
        refetchOnWindowFocus:false,
        staleTime:3000
    })