import { getRatedTag, Tag } from './tag';

export interface Item {
  Famille: string;
  ID: string;
  Planet: string;
  People: string;
  Prosperity: string;
  Recommandation: string;
  Criteres: string;
  Justifications: string;
  Etape: string;
  Tests: string[];
  RecoConseil: string;
  Difficulte: string;
  Incontournable: boolean;
  Tags: string[];
  Acteurs: string[];
  Indicateurs: string;
  Xindicateur: string;
  Yindicateur: string;
}

export const getTags = (item: Item): Tag[] => {
  const list: Tag[] = [];

  list.push(getRatedTag('mdi-earth', item.Planet));
  list.push(getRatedTag('mdi-account-group', item.People));
  list.push(getRatedTag('mdi-cards-heart', item.Prosperity));
  return list;
};
