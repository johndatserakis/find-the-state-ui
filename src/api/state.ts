import { State } from '../types/game';
import { axios } from '../utils/axios';

export const get = async (state: string) => {
  const url = `/states/name/${state}`;

  try {
    const { data } = await axios.get<State>(url);
    return data;
  } catch (error) {
    // @ts-ignore
    return new Error(error.message || error);
  }
};
