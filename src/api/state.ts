import { axios } from '../utils/axios';
import { State } from '../recoil/game/types';

export const get = async (state: string) => {
  const url = `/states/name/${state}`;

  try {
    const { data } = await axios.get<State>(url);
    return data;
  } catch (error) {
    return new Error(error.message || error);
  }
};
