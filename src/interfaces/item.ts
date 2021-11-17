import { Tag } from './tag';

export interface Item {
  name: string;
  code?: string;
  shortDescription?: string;
  longDescription?: string;
}

export const getTags = (item: Item): Tag[] => {
  const list: Tag[] = [];
  list.push({ type: 'semester', name: item.name, color: 'blue lighten-1' } as Tag);
  list.push({ type: 'semester', name: 'tag 1', color: 'blue lighten-3' } as Tag);
  list.push({ type: 'teacher', name: 'tag 2', color: 'deep-purple lighten-3' } as Tag);
  return list;
};
