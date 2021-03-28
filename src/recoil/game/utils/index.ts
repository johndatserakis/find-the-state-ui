import _states from '../../../data/states.json';

type Items = string[];

const itemsList = _states as Items;

export const getAvailableItems = (used: string[]) => itemsList.filter((item) => !used.includes(item));
