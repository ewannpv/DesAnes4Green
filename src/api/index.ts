import { Item } from '@/interfaces/item';
import data from './mock_items';

export function getAllItems(): Item[] {
  let dataList: Item[] = [];
  for (let i = 0; i < 20; i += 1) dataList = dataList.concat(data);
  return dataList;
}

export function todo(): void {
  console.log('todo');
}
