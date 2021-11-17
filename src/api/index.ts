import { Item } from '@/interfaces/item';
import data from '@/assets/data/dataList';

export function getAllItems(): Item[] {
  return data;
}

export function todo(): void {
  console.log('todo');
}
