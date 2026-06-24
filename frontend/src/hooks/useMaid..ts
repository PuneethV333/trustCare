import { useQuery } from "@tanstack/react-query";
import { getMaidsApi, getTopMaidsApi } from "../api/maid.api";

export const useGetTopMaids = () => 
    useQuery({
        queryKey:["top","maid"],
        queryFn:getTopMaidsApi,
        refetchOnWindowFocus:false,
        staleTime:3000
    })
    
    
export const useGetMaids = () => 
    useQuery({
        queryKey:["maids"],
        queryFn:getMaidsApi,
    })