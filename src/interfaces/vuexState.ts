import { Item } from '@/interfaces/item';

export interface VuexState {
  items: Item[];
  displayedItems: Item[];
  selectedItems: Item[];
  searchDrawer: unknown;
  cartDrawer: unknown;
  cartlen: number;
  dialogItem: unknown;
  maxDisplayedItems: number;
}
