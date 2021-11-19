import { Item } from '@/interfaces/item';
import data from '@/assets/data/dataList';
import { FamilyHisto, ItemTags } from '@/assets/data/dataFilters';
import Stages from '@/assets/data/dataCart';

export function getAllItems(): Item[] {
  return data;
}

export function getAllItemTags(): string[] {
  return ItemTags;
}
export function getFamilyHisto(): (string | number)[][] {
  return FamilyHisto;
}

export function getAllStages(): string[] {
  return Stages;
}

export function getFamilyNames(): string[] {
  return FamilyHisto.map((item: (string | number)[]) => item[0] as string);
}
