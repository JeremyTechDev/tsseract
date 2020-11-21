import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import { createEditor, Node } from 'slate';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import isHotkey from 'is-hotkey';
import {
  FormatBold,
  FormatUnderlined,
  FormatItalic,
  FormatListBulleted,
  FormatQuote,
  Code,
  Title,
  FormatListNumbered,
} from '@material-ui/icons';

import {
  Element,
  FormatType,
  isBlockActive,
  isMarkActive,
  Leaf,
  toggleMark,
  toggleBlock,
  HOTKEYS,
} from '../../helpers/slate';
import useStyles from './styles';

type AttributesType = [FormatType, boolean, ReactNode];
const attributes: AttributesType[] = [
  ['bold', false, <FormatBold />],
  ['italic', false, <FormatItalic />],
  ['underline', false, <FormatUnderlined />],
  ['code', false, <Code />],
  ['heading-one', true, <Title />],
  ['heading-two', true, <Title fontSize="small" />],
  ['block-quote', true, <FormatQuote />],
  ['numbered-list', true, <FormatListNumbered />],
  ['bulleted-list', true, <FormatListBulleted />],
];

interface Props {
  readOnly?: boolean;
}

const RichTextExample: React.FC<Props> = ({ readOnly = false }) => {
  const classes = useStyles();
  const [value, setValue] = useState<Node[]>(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <ToggleButtonGroup className={classes.toolbar}>
        {attributes.map((attributes) => (
          <Toggle className={classes.noBorder} attributes={attributes} />
        ))}
      </ToggleButtonGroup>
      <Editable
        autoFocus
        placeholder="Enter your post content here..."
        readOnly={readOnly}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}
      />
    </Slate>
  );
};

type ToggleType = { attributes: AttributesType; className: any };
const Toggle = ({ attributes, className }: ToggleType) => {
  const editor = useSlate();
  const [format, isBlock, icon] = attributes;

  return (
    <ToggleButton
      className={className}
      value={format}
      selected={
        isBlock ? isBlockActive(editor, format) : isMarkActive(editor, format)
      }
      onMouseDown={(event) => {
        event.preventDefault();
        isBlock ? toggleBlock(editor, format) : toggleMark(editor, format);
      }}
    >
      {icon}
    </ToggleButton>
  );
};

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

export default RichTextExample;
