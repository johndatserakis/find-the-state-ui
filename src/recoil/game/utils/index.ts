import { items } from '../data';
import { getUnusedItems } from '../../../utils/array';

export const getAvailableItems = (used: string[]) => getUnusedItems(items, used);
