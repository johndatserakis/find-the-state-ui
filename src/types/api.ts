export interface ReturnedData<T> {
  data?: T;
  loading: boolean;
  error: unknown;
  errored: boolean;
}
