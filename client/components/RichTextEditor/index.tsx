import React, { useCallback, useMemo, useState } from 'react';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import { createEditor, Node } from 'slate';
import { Tooltip } from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import isHotkey from 'is-hotkey';

import {
  Element,
  FormatType,
  HOTKEYS,
  initialValue,
  isBlockActive,
  isMarkActive,
  Leaf,
  toggleBlock,
  toggleMark,
} from './Slate';
import useStyles from './styles';
import { ToolType, tools } from './Tools';

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
      {!readOnly && (
        <ToggleButtonGroup className={classes.toolbar}>
          {tools.map((tool) => (
            <Toggle
              key={tool.format}
              className={classes.noBorder}
              tool={tool}
            />
          ))}
        </ToggleButtonGroup>
      )}
      <Editable
        autoFocus
        className={classes.editable}
        placeholder="Enter your post content here..."
        readOnly={readOnly}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
              const mark: FormatType = HOTKEYS[hotkey];
              const isBlock = mark.split('-').length >= 2;
              isBlock ? toggleBlock(editor, mark) : toggleMark(editor, mark);
            }
          }
        }}
      />
    </Slate>
  );
};

type ToggleType = { tool: ToolType; className: any };
const Toggle = ({ tool, className }: ToggleType) => {
  const editor = useSlate();
  const { format, isBlock, icon, shortcut } = tool;

  return (
    <Tooltip title={shortcut} arrow>
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
    </Tooltip>
  );
};

export default RichTextExample;
