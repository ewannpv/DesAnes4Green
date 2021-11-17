import { Item } from '@/interfaces/item';

export interface VuexState {
  items: Item[];
  selectedItems: Item[];
  searchDrawer: unknown;
  cartDrawer: unknown;
  cartlen: number;
  dialogItem: unknown;
  maxDisplayedItems: number;
  familySearchFilter: string;
  tagSearchFilters: string[];
}
