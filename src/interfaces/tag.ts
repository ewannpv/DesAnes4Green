export interface Tag {
  type: string;
  name?: string;
  color?: string;
}

export interface ListTag {
  type: string;
  name: string;
  tags: Tag[];
}
