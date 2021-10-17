import useSWR from 'swr';
import { axios } from '../library/axios';
import { ReturnedData } from '../types/api';
import { Score, Scores } from '../types/game';
import { fetcher, parseError } from '../utils/api';

export const useGetScores = (): ReturnedData<Scores> => {
  const url = `/scores`;
  const { data, error } = useSWR<Scores>(url, fetcher);

  return {
    data,
    loading: !error && !data,
    error,
    errored: !data && error,
  };
};

export const post = async ({ score, streak_high }: Score) => {
  const url = `/scores`;
  const payload = { score, streak_high };

  try {
    await axios.post(url, payload);
  } catch (error: unknown) {
    return parseError(error);
  }
};
