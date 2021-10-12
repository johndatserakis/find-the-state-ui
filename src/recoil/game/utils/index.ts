import { getUnusedItems } from '../../../utils/array';
import { items } from '../data';

export const getAvailableItems = (used: string[]) => getUnusedItems(items, used);
