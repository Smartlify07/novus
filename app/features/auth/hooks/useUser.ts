import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api";

const USER_QUERY_KEY = ["user"];
export const useUser = () => {
  return useQuery({
    queryFn: getUser,
    queryKey: USER_QUERY_KEY,
    refetchOnWindowFocus: true,
  });
};
