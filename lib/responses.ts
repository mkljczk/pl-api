interface PaginatedResponse<T> {
  previous: (() => Promise<PaginatedResponse<T>>) | null;
  next: (() => Promise<PaginatedResponse<T>>) | null;
  items: Array<T>;
  partial: boolean;
}

export type {
  PaginatedResponse,
};
