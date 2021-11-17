import { Item } from '@/interfaces/item';
import data from './mock_items';

export function getAllItems(): Item[] {
  return data;
}
