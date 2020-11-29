import React, { useCallback, useMemo } from 'react';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import { createEditor, Node } from 'slate';
import { Tooltip, Typography, Grid } from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import isHotkey from 'is-hotkey';

import {
  Element,
  FormatType,
  HOTKEYS,
  isBlockActive,
  isMarkActive,
  Leaf,
  toggleBlock,
  toggleMark,
} from './Slate';
import useStyles from './styles';
import { ToolType, tools, alignments } from './Tools';
import { withLinks, withImages, LinkButton, ImageButton } from './Links';

interface Props {
  readOnly?: boolean;
  value: Node[];
  setValue?: React.Dispatch<React.SetStateAction<Node[]>>;
}

const RichTextEditor: React.FC<Props> = ({
  value,
  setValue,
  readOnly = false,
}) => {
  const classes = useStyles();
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(
    () => withImages(withLinks(withReact(createEditor()))),
    [],
  );

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={setValue ? (value) => setValue(value) : () => {}}
    >
      {!readOnly && (
        <Grid container justify="flex-start">
          <ToggleButtonGroup className={classes.toolbar}>
            {alignments.map((align) => (
              <Toggle
                key={align.format}
                className={classes.noBorder}
                tool={align}
              />
            ))}
          </ToggleButtonGroup>

          <ToggleButtonGroup className={classes.toolbar}>
            {tools.map((tool) => (
              <Toggle
                key={tool.format}
                className={classes.noBorder}
                tool={tool}
              />
            ))}
          </ToggleButtonGroup>

          <ToggleButtonGroup className={classes.toolbar}>
            <LinkButton />
            <ImageButton />
          </ToggleButtonGroup>
        </Grid>
      )}

      <Editable
        autoFocus
        className={classes.editable}
        name="content"
        placeholder="Enter your post content here..."
        readOnly={readOnly}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
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
    <Tooltip
      arrow
      title={<Typography variant="subtitle2">{shortcut}</Typography>}
    >
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

export default RichTextEditor;
