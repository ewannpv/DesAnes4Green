import { Tag } from './tag';

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

const ColorEnum = Object.freeze({
  A: 'green darken-1',
  B: 'orange darken-1',
  C: 'red darken-1',
  NONE: 'blue-grey lighten-5',
});

export const getItemTags = (tagsList: string[]): Tag[] => {
  const tags: Tag[] = [];
  tagsList.forEach((name: string) => {
    tags.push({ name, color: 'deep-purple lighten-2' } as Tag);
  });
  return tags;
};

export const getFamilyTag = (name: string): Tag => {
  const tag = {
    name: name.length ? name : 'N/A',
    color: name.length ? 'light-blue darken-3' : ColorEnum.NONE,
  } as Tag;
  return tag;
};
export const getDifficultyTag = (name: string): Tag => {
  let stars = 'Difficulté: ';
  let color: string;
  switch (name) {
    case '*':
      color = ColorEnum.A;
      stars += '★';
      break;
    case '**':
      color = ColorEnum.B;
      stars += '★★';
      break;
    case '***':
      color = ColorEnum.C;
      stars += '★★★';
      break;

    default:
      color = ColorEnum.NONE;
      stars += 'N/A';
      break;
  }
  const tag = {
    name: name.length ? stars : 'N/A',
    color,
  } as Tag;
  return tag;
};

export const getRatedTag = (icon: string, rate: string): Tag => {
  let color: string;
  let name: string = rate;

  switch (rate) {
    case 'A':
      color = ColorEnum.A;
      break;

    case 'B':
      color = ColorEnum.B;
      break;

    case 'C':
      color = ColorEnum.C;
      break;

    default:
      color = ColorEnum.NONE;
      name = 'N/A';
      break;
  }

  return { name, icon, color } as Tag;
};

export const getTags = (item: Item): Tag[] => {
  let list: Tag[] = [];

  list.push(getFamilyTag(item.Famille));
  list.push(getRatedTag('mdi-earth', item.Planet));
  list.push(getRatedTag('mdi-account-group', item.People));
  list.push(getRatedTag('mdi-cards-heart', item.Prosperity));
  list.push(getDifficultyTag(item.Difficulte));
  const itemTags = getItemTags(item.Tags);
  if (itemTags.length) list = list.concat(itemTags);
  return list;
};
