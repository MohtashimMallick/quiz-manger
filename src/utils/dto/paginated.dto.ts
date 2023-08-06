interface PaginationMeta {
  totalItems: number;
  itemsCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

class PaginaitedDto<TData> {
  items: TData[];
  meta: PaginationMeta;
}

export { PaginaitedDto, PaginationMeta };
