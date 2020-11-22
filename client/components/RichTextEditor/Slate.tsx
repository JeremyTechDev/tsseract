import React, { ReactNode } from 'react';
import { ReactEditor } from 'slate-react';
import { Editor, Transforms } from 'slate';

import { Bold, Code, Quote, Heading1, Heading2 } from './Components';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
type EditorType = Editor & ReactEditor;

export type FormatType =
  | 'paragraph'
  | 'bold'
  | 'bulleted-list'
  | 'code'
  | 'heading-one'
  | 'heading-two'
  | 'italic'
  | 'block-quote'
  | 'numbered-list'
  | 'underline'
  | 'list-item';

export const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
  'mod+shift+1': 'heading-one',
  'mod+shift+2': 'heading-two',
  'mod+shift+7': 'numbered-list',
  'mod+shift+8': 'bulleted-list',
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
  element: { type: FormatType };
  children: ReactNode;
  attributes: unknown;
};
export const Element = ({ attributes, children, element }: ElementType) => {
  switch (element.type) {
    case 'block-quote':
      return <Quote {...attributes}>{children}</Quote>;
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
    default:
      return <p {...attributes}>{children}</p>;
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

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
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
    type: 'paragraph',
    children: [{ text: '' }],
  },
];
