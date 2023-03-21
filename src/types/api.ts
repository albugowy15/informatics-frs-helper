export type APIResponse<TData> = {
  status: 'success' | 'error';
  message: string;
  data?: TData;
};
