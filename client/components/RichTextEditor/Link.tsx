import React from 'react';
import { Editor, Transforms, Range, Element as SlateElement } from 'slate';
import { useSlate } from 'slate-react';
import { ToggleButton } from '@material-ui/lab';
import { Link } from '@material-ui/icons';
import isURL from 'is-url';

import { EditorType } from './Slate';

export const withLinks = (editor: EditorType) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) => {
    return element.type === 'link' ? true : isInline(element);
  };

  editor.insertText = (text) => {
    if (text && isURL(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');

    if (text && isURL(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertLink = (editor: EditorType, url: string) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
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
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: 'link',
    url,
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
  return (
    <ToggleButton
      selected={isLinkActive(editor)}
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt('Enter the URL of the link:');
        if (!url) return;
        insertLink(editor, url);
      }}
    >
      <Link />
    </ToggleButton>
  );
};
