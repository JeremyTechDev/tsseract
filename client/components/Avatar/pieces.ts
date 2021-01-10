interface iType {
  type: string;
  text?: string;
  colorCode?: string;
  shared?: boolean;
}

export const tabsWithColors = {
  1: 'hairColor',
  2: 'facialHairColor',
  6: 'clotheColor',
};

export const labels = [
  'Skin',
  'Hair',
  'Facial Hair',
  'Eyes',
  'Eyebrows',
  'Mouth',
  'Clothes',
  'Accessories',
];

export const skins: iType[] = [
  { type: 'Tanned', colorCode: '#FD9841' },
  { type: 'Yellow', colorCode: '#F8D25C' },
  { type: 'Pale', colorCode: '#FFDBB4' },
  { type: 'Light', colorCode: '#EDB98A' },
  { type: 'Brown', colorCode: '#D08B5B' },
  { type: 'DarkBrown', colorCode: '#AE5D29' },
  { type: 'Black', colorCode: '#614335' },
];

export const hairColors: iType[] = [
  { type: 'Auburn', colorCode: '#A55728' },
  { type: 'Black', colorCode: '#2C1B18' },
  { type: 'Blonde', colorCode: '#B58143' },
  { type: 'BlondeGolden', colorCode: '#D6B370' },
  { type: 'Brown', colorCode: '#724133' },
  { type: 'BrownDark', colorCode: '#4A312C' },
  { type: 'PastelPink', colorCode: '#F59797', shared: false },
  { type: 'Platinum', colorCode: '#ECDCBF' },
  { type: 'Red', colorCode: '#C93305' },
  { type: 'SilverGray', colorCode: '#E8E1E1', shared: false },
];
export const hairs: iType[] = [
  { type: 'NoHair', text: 'Bald' },
  { type: 'LongHairBigHair', text: 'Big Hair' },
  { type: 'LongHairBob', text: 'Bob' },
  { type: 'LongHairBun', text: 'Bun' },
  { type: 'LongHairCurly', text: 'Curly' },
  { type: 'LongHairCurvy', text: 'Curvy' },
  { type: 'LongHairDreads', text: 'Dreads' },
  { type: 'LongHairFrida', text: 'Frida' },
  { type: 'LongHairFro', text: 'Fro' },
  { type: 'LongHairFroBand', text: 'Fro Band' },
  { type: 'LongHairNotTooLong', text: 'Not Too Long' },
  { type: 'LongHairShavedSides', text: 'Shaved Sides' },
  { type: 'LongHairMiaWallace', text: 'Mia Wallace' },
  { type: 'LongHairStraight', text: 'Straight' },
  { type: 'LongHairStraight2', text: 'Straight 2' },
  { type: 'LongHairStraightStrand', text: 'Straight Strand' },
  { type: 'ShortHairDreads01', text: 'Dreads 1' },
  { type: 'ShortHairDreads02', text: 'Dreads 2' },
  { type: 'ShortHairFrizzle', text: 'Frizzle' },
  { type: 'ShortHairShaggyMullet', text: 'Shaggy Mullet' },
  { type: 'ShortHairShortCurly', text: 'Curly' },
  { type: 'ShortHairShortFlat', text: 'Flat' },
  { type: 'ShortHairShortRound', text: 'Round' },
  { type: 'ShortHairShortWaved', text: 'Waved' },
  { type: 'ShortHairSides', text: 'Sides' },
  { type: 'ShortHairTheCaesar', text: 'The Caesar' },
  {
    type: 'ShortHairTheCaesarSidePart',
    text: 'The Caesar Side Part',
  },
];

export const facialHairs: iType[] = [
  { type: 'Black', text: 'None' },
  { type: 'BeardMedium', text: 'Medium' },
  { type: 'BeardLight', text: 'Light' },
  { type: 'BeardMajestic', text: 'Majestic' },
  { type: 'MoustacheFancy', text: 'Fancy Moustache' },
  { type: 'MoustacheMagnum', text: 'Magnum Moustache' },
];

export const eyes: iType[] = [
  { type: 'Default' },
  { type: 'Close', text: 'Closed' },
  { type: 'Cry' },
  { type: 'Dizzy' },
  { type: 'EyeRoll', text: 'Eye Roll' },
  { type: 'Happy' },
  { type: 'Hearts' },
  { type: 'Side' },
  { type: 'Squint' },
  { type: 'Surprised' },
  { type: 'Wink' },
  { type: 'WinkWacky', text: 'Wink Wacky' },
];

export const eyebrows: iType[] = [
  { type: 'Default' },
  { type: 'DefaultNatural', text: 'Natural' },
  { type: 'Angry' },
  { type: 'AngryNatural', text: 'Angry 2' },
  { type: 'FlatNatural', text: 'Flat' },
  { type: 'RaisedExcited', text: 'Raised' },
  { type: 'RaisedExcitedNatural', text: 'Raised Excited' },
  { type: 'SadConcerned', text: 'Sad' },
  { type: 'SadConcernedNatural', text: 'Sad Concerned' },
  { type: 'UnibrowNatural', text: 'Unibrow' },
  { type: 'UpDown', text: 'Up-Down' },
  { type: 'UpDownNatural', text: 'Up-Down 2' },
];

export const mouths: iType[] = [
  { type: 'Default' },
  { type: 'Concerned' },
  { type: 'Disbelief' },
  { type: 'Eating' },
  { type: 'Grimace' },
  { type: 'Sad' },
  { type: 'ScreamOpen', text: 'Scream' },
  { type: 'Serious' },
  { type: 'Smile' },
  { type: 'Tongue' },
  { type: 'Twinkle' },
  { type: 'Vomit' },
];

export const accessories: iType[] = [
  { type: 'Blank', text: 'None' },
  { type: 'Kurt' },
  { type: 'Prescription01', text: 'Wendy' },
  { type: 'Prescription02', text: 'Bob' },
  { type: 'Round', text: 'Harry Potter' },
  { type: 'Sunglasses' },
  { type: 'Wayfarers' },
];

export const clothesColor: iType[] = [
  { type: 'Black', colorCode: '#262E33' },
  { type: 'Blue01', colorCode: '#65C9FF' },
  { type: 'Blue02', colorCode: '#5199E4' },
  { type: 'Blue03', colorCode: '#25557C' },
  { type: 'Gray01', colorCode: '#E6E6E6' },
  { type: 'Gray02', colorCode: '#929598' },
  { type: 'Heather', colorCode: '#3C4F5C' },
  { type: 'PastelBlue', colorCode: '#3C4F5C' },
  { type: 'PastelGreen', colorCode: '#A7FFC4' },
  { type: 'PastelOrange', colorCode: '#FFDEB5' },
  { type: 'PastelRed', colorCode: '#FFAFB9' },
  { type: 'PastelYellow', colorCode: '#FFFFB1' },
  { type: 'Pink', colorCode: '#FF488E' },
  { type: 'Red', colorCode: '#FF5C5C' },
  { type: 'White', colorCode: '#FFFFFF' },
];
export const clothes: iType[] = [
  { type: 'BlazerShirt', text: 'Blazer Shirt' },
  { type: 'BlazerSweater', text: 'Blazer Sweater' },
  { type: 'CollarSweater', text: 'Collar Sweater' },
  { type: 'GraphicShirt', text: 'Graphic Shirt' },
  { type: 'Hoodie' },
  { type: 'Overall' },
  { type: 'ShirtCrewNeck', text: 'Crew Shirt' },
  { type: 'ShirtScoopNeck', text: 'Scoop Shirt' },
  { type: 'ShirtVNeck', text: 'V-Shaped Shirt' },
];
