import { ReactNode } from 'react';
import { ReactEditor } from 'slate-react';
import { Editor, Transforms } from 'slate';
import { Typography, Link } from '@mui/material';

import {
  Bold,
  Code,
  CodeBlock,
  Heading1,
  Heading2,
  Image,
  Quote,
} from './Components';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
export type EditorType = Editor & ReactEditor;

export type FormatType =
  | 'align-left'
  | 'align-right'
  | 'align-center'
  | 'align-justify'
  | 'paragraph'
  | 'bold'
  | 'bulleted-list'
  | 'code'
  | 'code-block'
  | 'heading-one'
  | 'heading-two'
  | 'italic'
  | 'block-quote'
  | 'numbered-list'
  | 'underline'
  | 'list-item'
  | 'link'
  | 'image';

export const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
  'mod+shift+`': 'code-block',
  'mod+shift+1': 'heading-one',
  'mod+shift+2': 'heading-two',
  'mod+shift+7': 'numbered-list',
  'mod+shift+8': 'bulleted-list',
  'mod+shift+.': 'block-quote',
  'mod+shift+L': 'align-left',
  'mod+shift+E': 'align-center',
  'mod+shift+R': 'align-right',
  'mod+shift+j': 'align-justify',
};

type LeafType = {
  leaf: { bold: boolean; code: boolean; italic: boolean; underline: boolean };
  children: ReactNode;
  attributes: unknown;
};
export const Leaf = ({ attributes, children, leaf }: LeafType) => {
  if (leaf.bold) children = <Bold>{children}</Bold>;
  if (leaf.code) children = <Code>{children}</Code>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;

  return <span {...attributes}>{children}</span>;
};

type ElementType = {
  element: { type: FormatType; url?: string };
  children: ReactNode;
  attributes: unknown;
};
export const Element = (props: ElementType) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case 'block-quote':
      return <Quote {...attributes}>{children}</Quote>;
    case 'code-block':
      return <CodeBlock {...attributes}>{children}</CodeBlock>;
    case 'heading-one':
      return <Heading1 {...attributes}>{children}</Heading1>;
    case 'heading-two':
      return <Heading2 {...attributes}>{children}</Heading2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'align-center':
      return <Typography align="center">{children}</Typography>;
    case 'align-right':
      return <Typography align="right">{children}</Typography>;
    case 'align-justify':
      return <Typography align="justify">{children}</Typography>;
    case 'align-left':
      return <Typography align="left">{children}</Typography>;
    case 'image':
      return <Image {...props} />;
    case 'link':
      return (
        <Link {...attributes} href={element.url}>
          {children}
        </Link>
      );
    default:
      return <Typography align="left">{children}</Typography>;
  }
};

export const toggleBlock = (editor: EditorType, format: FormatType) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type as string),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const toggleMark = (editor: EditorType, format: FormatType) => {
  const isActive = isMarkActive(editor, format);

  isActive
    ? Editor.removeMark(editor, format)
    : Editor.addMark(editor, format, true);
};

export const isBlockActive = (editor: EditorType, format: FormatType) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });

  return !!match;
};

export const isMarkActive = (editor: EditorType, format: FormatType) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const initialValue = [
  {
    type: 'align-left',
    children: [{ text: '' }],
  },
];
