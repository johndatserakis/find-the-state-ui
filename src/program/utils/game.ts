import { getUnusedItems } from '../../utils/array';
import { items } from '../data/game';

export const getAvailableItems = (used: string[]) => getUnusedItems(items, used);
