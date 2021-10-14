import { items } from '../data/game';
import { getUnusedItems } from '../utils/array';

export const getAvailableItems = (used: string[]) => getUnusedItems(items, used);
