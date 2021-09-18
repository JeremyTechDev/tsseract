const black = '#343a40';
const blue = '#007bff';
const cyan = '#17a2b8';
const gray = '#6c757d';
const green = '#28a745';
const magenta = '#9b59b6';
const orange = '#d35400';
const white = '#ffffff';
const yellow = '#ffc107';

type ColorType = { marginLeft: number; background: string; color?: string };
const colors: ColorType[] = [
  { marginLeft: 10, background: black, color: white },
  { marginLeft: 10, background: blue, color: white },
  { marginLeft: 10, background: cyan, color: white },
  { marginLeft: 10, background: yellow, color: black },
  { marginLeft: 10, background: gray, color: white },
  { marginLeft: 10, background: green, color: white },
  { marginLeft: 10, background: magenta, color: white },
  { marginLeft: 10, background: orange, color: white },
  { marginLeft: 10, background: white, color: black },
];

export const getTagColor = (tagName: string) => {
  let charValue = 0;

  for (let index = 0; index < tagName.length; index++) {
    charValue += tagName.charCodeAt(index);
  }

  return colors[charValue % colors.length];
};
