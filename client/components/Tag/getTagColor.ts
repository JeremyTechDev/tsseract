const black = '#343a40';
const blue = '#007bff';
const cyan = '#17a2b8';
const gray = '#6c757d';
const green = '#28a745';
const magenta = '#9b59b6';
const orange = '#d35400';
const white = '#ffffff';
const yellow = '#ffc107';

type ColorType = { background: string; color?: string };
const colors: ColorType[] = [
  { background: black, color: white },
  { background: blue, color: white },
  { background: cyan, color: white },
  { background: yellow, color: black },
  { background: gray, color: white },
  { background: green, color: white },
  { background: magenta, color: white },
  { background: orange, color: white },
  { background: white, color: black },
];

export const getTagColor = (tagName: string) => {
  let charValue = 0;

  for (let index = 0; index < tagName.length; index++) {
    charValue += tagName.charCodeAt(index);
  }

  return colors[charValue % colors.length];
};
