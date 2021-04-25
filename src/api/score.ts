import { Scores } from '../types/score';
import { axios } from '../utils/axios';

export const get = async () => {
  const url = `/scores`;

  try {
    const { data } = await axios.get<Scores>(url);
    return data;
  } catch (error) {
    return new Error(error.message || error);
  }
};

export const post = async (score: string) => {
  const url = `/scores`;
  const payload = { score };

  try {
    await axios.post(url, payload);
  } catch (error) {
    return new Error(error.message || error);
  }
};
