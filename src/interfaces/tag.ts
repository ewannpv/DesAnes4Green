export interface Tag {
  name?: string;
  icon?: string;
  color?: string;
}

const ColorEnum = Object.freeze({
  A: 'green darken-1',
  B: 'orange darken-1',
  C: 'red darken-1',
  NONE: 'blue-grey lighten-5',
});

export const getFamilyTag = (name: string): Tag => {
  const tag = {
    name: name.length ? name : 'N/A',
    icon: 'mdi-home-group  ',
    color: name.length ? 'light-blue darken-3' : ColorEnum.NONE,
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
