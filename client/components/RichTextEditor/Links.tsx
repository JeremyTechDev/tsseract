import React from 'react';
import isURL from 'is-url';
import { useSlate } from 'slate-react';
import { IconButton } from '@material-ui/core';
import { Editor, Transforms, Range, Element as SlateElement } from 'slate';
import { Link, Image } from '@material-ui/icons';

import { EditorType } from './Slate';
import useStyles from './styles';

export const withLinks = (editor: EditorType) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) => {
    return element.type === 'link' ? true : isInline(element);
  };

  editor.insertText = (text) => {
    text && isURL(text) ? wrapLink(editor, text) : insertText(text);
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');
    text && isURL(text) ? wrapLink(editor, text) : insertData(data);
  };

  return editor;
};

export const withImages = (editor: EditorType) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === 'image' ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split('/');

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result;
            insertImage(editor, url as string);
          });

          reader.readAsDataURL(file);
        }
      }
    } else {
      text && isURL(text) ? insertImage(editor, text) : insertData(data);
    }
  };

  return editor;
};

const insertLink = (editor: EditorType, url: string) => {
  if (editor.selection) wrapLink(editor, url);
};

const insertImage = (editor: EditorType, url: string) => {
  const text = { text: '' };
  const image = { type: 'image', url, children: [text] };
  Transforms.insertNodes(editor, image);
};

const isLinkActive = (editor: EditorType) => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  });
  return !!link;
};

const unwrapLink = (editor: EditorType) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  });
};

const wrapLink = (editor: EditorType, url: string) => {
  if (isLinkActive(editor)) unwrapLink(editor);

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    url,
    type: 'link',
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

export const LinkButton = () => {
  const editor = useSlate();
  const classes = useStyles();
  return (
    <IconButton
      title="Add link"
      className={classes.noBorder}
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt('Enter the URL of the link:');
        if (!url) return;
        insertLink(editor, url);
      }}
    >
      <Link />
    </IconButton>
  );
};

export const ImageButton = () => {
  const editor = useSlate();
  const classes = useStyles();
  return (
    <IconButton
      title="Add image"
      className={classes.noBorder}
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt('Enter the URL of the image:');
        if (!url) return;
        insertImage(editor, url);
      }}
    >
      <Image />
    </IconButton>
  );
};
