import { Item } from '@/interfaces/item';

export interface VuexState {
  items: Item[];
  displayedItems: Item[];
  selectedItems: Item[];
  drawer: unknown;
  cartlen: number;
}
