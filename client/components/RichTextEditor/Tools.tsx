import { ReactNode } from 'react';
import {
  Code,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatUnderlined,
  Title,
} from '@material-ui/icons';

import { FormatType } from './Slate';

export interface ToolType {
  format: FormatType;
  icon: ReactNode;
  isBlock: boolean;
  shortcut: string;
}

export const tools: ToolType[] = [
  {
    format: 'bold',
    icon: <FormatBold />,
    isBlock: false,
    shortcut: 'Ctrl+B',
  },
  {
    format: 'italic',
    icon: <FormatItalic />,
    isBlock: false,
    shortcut: 'Ctrl+I',
  },
  {
    format: 'underline',
    icon: <FormatUnderlined />,
    isBlock: false,
    shortcut: 'Ctrl+U',
  },
  {
    format: 'code',
    icon: <Code />,
    isBlock: false,
    shortcut: 'Ctrl+`',
  },
  {
    format: 'heading-one',
    icon: <Title />,
    isBlock: true,
    shortcut: 'Ctrl+Shift+1',
  },
  {
    format: 'heading-two',
    icon: <Title fontSize="small" />,
    isBlock: true,
    shortcut: 'Ctrl+Shift+2',
  },
  {
    format: 'block-quote',
    icon: <FormatQuote />,
    isBlock: true,
    shortcut: '',
  },
  {
    format: 'numbered-list',
    icon: <FormatListNumbered />,
    isBlock: true,
    shortcut: 'Ctrl+Shift+7',
  },
  {
    format: 'bulleted-list',
    icon: <FormatListBulleted />,
    isBlock: true,
    shortcut: 'Ctrl+Shift+8',
  },
];
