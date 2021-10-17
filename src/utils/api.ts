import { axios } from '../library/axios';

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ERROR_MESSAGE = 'Server Error';

export const parseError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return ERROR_MESSAGE;
};
