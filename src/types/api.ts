export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export type ApiListResponse<T> = ApiResponse<T[]>;

export interface ApiError {
  status: number;
  message: string;
}
