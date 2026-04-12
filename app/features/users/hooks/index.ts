import { useQuery } from '@tanstack/react-query';
import { PaginatedUserResponse } from '../types';
import { getUsers } from '../api';

export const USERS_QUERY_KEY = ['users'];

export function useUsers() {
  return useQuery<PaginatedUserResponse>({
    queryKey: USERS_QUERY_KEY,
    queryFn: getUsers,
  });
}
