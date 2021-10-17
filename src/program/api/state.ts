import useSWR from 'swr';
import { ReturnedData } from '../../types/api';
import { fetcher } from '../../utils/api';
import { State, TargetItem } from '../types/game';

export const useGetState = (targetItem: TargetItem): ReturnedData<State> => {
  const shouldFetch = targetItem !== undefined;

  const url = `/states/name/${targetItem}`;
  const { data, error } = useSWR<State>(shouldFetch ? url : null, fetcher);

  return {
    data,
    loading: !error && !data,
    error,
    errored: !data && error,
  };
};
