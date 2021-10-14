import { Score, Scores } from '../types/game';
import { axios } from '../utils/axios';

export const get = async () => {
  const url = `/scores`;

  try {
    const { data } = await axios.get<Scores>(url);
    return data;
  } catch (error) {
    // @ts-ignore
    return new Error(error.message || error);
  }
};

export const post = async ({ score, streak_high }: Score) => {
  const url = `/scores`;
  const payload = { score, streak_high };

  try {
    await axios.post(url, payload);
  } catch (error) {
    // @ts-ignore
    return new Error(error.message || error);
  }
};
