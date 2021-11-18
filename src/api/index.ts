import { Item } from '@/interfaces/item';
import data from '@/assets/data/dataList';
import { ItemTags } from '@/assets/data/dataFilters';

export function getAllItems(): Item[] {
  return data;
}

export function getAllItemTags(): string[] {
  return ItemTags;
}
export function todo(): void {
  console.log('todo');
}
