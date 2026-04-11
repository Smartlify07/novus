import { Pageable, SortConfig, User } from '@/types';

export interface PaginatedUserResponse {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  content: User[];
  number: number;
  sort: SortConfig;
  empty: boolean;
}
