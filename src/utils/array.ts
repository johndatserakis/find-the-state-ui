export const getUnusedItems = (items: string[], used: string[]) => items.filter((item) => !used.includes(item));
