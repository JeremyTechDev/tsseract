export interface iType {
  type: string;
  text?: string;
  colorCode?: string;
  shared?: boolean;
}
export const skins: iType[] = [
  { type: 'Tanned' },
  { type: 'Yellow' },
  { type: 'Pale' },
  { type: 'Light' },
  { type: 'Brown' },
  { type: 'DarkBrown', text: 'Dark Brown' },
  { type: 'Black' },
];

export const hats = [
  { type: 'Eyepatch' },
  { type: 'Hat' },
  { type: 'Hijab' },
  { type: 'Turban' },
  { type: 'WinterHat1' },
  { type: 'WinterHat2' },
  { type: 'WinterHat3' },
  { type: 'WinterHat4' },
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
  { type: 'NoHair', text: 'No hair' },
  { type: 'LongHairBigHair', text: 'Long Hair Big Hair' },
  { type: 'LongHairBob', text: 'Long Hair Bob' },
  { type: 'LongHairBun', text: 'Long Hair Bun' },
  { type: 'LongHairCurly', text: 'Long Hair Curly' },
  { type: 'LongHairCurvy', text: 'Long Hair Curvy' },
  { type: 'LongHairDreads', text: 'Long Hair Dreads' },
  { type: 'LongHairFrida', text: 'Long Hair Frida' },
  { type: 'LongHairFro', text: 'Long Hair Fro' },
  { type: 'LongHairFroBand', text: 'Long Hair FroBand' },
  { type: 'LongHairNotTooLong', text: 'Long Hair Not Too Long' },
  { type: 'LongHairShavedSides', text: 'Long Hair Shaved Sides' },
  { type: 'LongHairMiaWallace', text: 'Long Hair Mia Wallace' },
  { type: 'LongHairStraight', text: 'Long Hair Straight' },
  { type: 'LongHairStraight2', text: 'Long Hair Straight 2' },
  { type: 'LongHairStraightStrand', text: 'Long Hair Straight Strand' },
  { type: 'ShortHairDreads01', text: 'Short Hair Dreads 1' },
  { type: 'ShortHairDreads02', text: 'Short Hair Dreads 2' },
  { type: 'ShortHairFrizzle', text: 'Short Hair Frizzle' },
  { type: 'ShortHairShaggyMullet', text: 'Short Hair Shaggy Mullet' },
  { type: 'ShortHairShortCurly', text: 'Short Hair Short Curly' },
  { type: 'ShortHairShortFlat', text: 'Short Hair Short Flat' },
  { type: 'ShortHairShortRound', text: 'Short Hair Short Round' },
  { type: 'ShortHairShortWaved', text: 'Short Hair Short Waved' },
  { type: 'ShortHairSides', text: 'Short Hair Sides' },
  { type: 'ShortHairTheCaesar', text: 'Short Hair The Caesar' },
  {
    type: 'ShortHairTheCaesarSidePart',
    text: 'Short Hair The Caesar Side Part',
  },
];

export const facialHairs: iType[] = [
  { type: 'Black', text: 'No Facial Hair' },
  { type: 'BeardMedium', text: 'Beard Medium' },
  { type: 'BeardLight', text: 'Beard Light' },
  { type: 'BeardMajestic', text: 'Beard Majestic' },
  { type: 'MoustacheFancy', text: 'Moustache Fancy' },
  { type: 'MoustacheMagnum', text: 'Moustache Magnum' },
];

export const eyes: iType[] = [
  { type: 'Close', text: 'Closed' },
  { type: 'Cry' },
  { type: 'Default' },
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
  { type: 'Angry' },
  { type: 'AngryNatural', text: 'Angry Natural' },
  { type: 'Default' },
  { type: 'DefaultNatural', text: 'Default Natural' },
  { type: 'FlatNatural', text: 'Flat Natural' },
  { type: 'RaisedExcited', text: 'Raised Excited' },
  { type: 'RaisedExcitedNatural', text: 'Raised Excited Natural' },
  { type: 'SadConcerned', text: 'Sad Concerned' },
  { type: 'SadConcernedNatural', text: 'Sad Concerned Natural' },
  { type: 'UnibrowNatural', text: 'Unibrow Natural' },
  { type: 'UpDown', text: 'Up-Down' },
  { type: 'UpDownNatural', text: 'Up-Down Natural' },
];

export const mouths: iType[] = [
  { type: 'Concerned' },
  { type: 'Default' },
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
  { type: 'Prescription01', text: 'Prescription 1' },
  { type: 'Prescription02', text: 'Prescription 2' },
  { type: 'Round' },
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
  { type: 'ShirtCrewNeck', text: 'Shirt Crew Neck' },
  { type: 'ShirtScoopNeck', text: 'Shirt Scoop Neck' },
  { type: 'ShirtVNeck', text: 'V-Shaped Shirt' },
];
