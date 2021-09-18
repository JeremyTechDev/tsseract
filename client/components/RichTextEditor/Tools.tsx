import { ReactNode } from 'react';
import {
  Code,
  DeveloperMode,
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatUnderlined,
  Title,
} from '@mui/icons-material';

import { FormatType } from './Slate';

export interface ToolType {
  format: FormatType;
  icon: ReactNode;
  isBlock: boolean;
  shortcut: string;
}

export const alignments: ToolType[] = [
  {
    format: 'align-left',
    icon: <FormatAlignLeft />,
    isBlock: true,
    shortcut: 'Left align (Ctrl+Alt+L)',
  },
  {
    format: 'align-center',
    icon: <FormatAlignCenter />,
    isBlock: true,
    shortcut: 'Center align (Ctrl+Alt+E)',
  },
  {
    format: 'align-right',
    icon: <FormatAlignRight />,
    isBlock: true,
    shortcut: 'Right align (Ctrl+Alt+R)',
  },
  {
    format: 'align-justify',
    icon: <FormatAlignJustify />,
    isBlock: true,
    shortcut: 'Justify (Ctrl+Alt+J)',
  },
];

export const tools: ToolType[] = [
  {
    format: 'bold',
    icon: <FormatBold />,
    isBlock: false,
    shortcut: 'Bold (Ctrl+B)',
  },
  {
    format: 'italic',
    icon: <FormatItalic />,
    isBlock: false,
    shortcut: 'Italic (Ctrl+I)',
  },
  {
    format: 'underline',
    icon: <FormatUnderlined />,
    isBlock: false,
    shortcut: 'Underline (Ctrl+U)',
  },
  {
    format: 'code',
    icon: <Code />,
    isBlock: false,
    shortcut: 'Inline Code (Ctrl+`)',
  },
  {
    format: 'code-block',
    icon: <DeveloperMode />,
    isBlock: true,
    shortcut: 'Block Code (Ctrl+Shift+`)',
  },
  {
    format: 'heading-one',
    icon: <Title />,
    isBlock: true,
    shortcut: 'Heading 1 (Ctrl+Shift+1)',
  },
  {
    format: 'heading-two',
    icon: <Title fontSize="small" />,
    isBlock: true,
    shortcut: 'Heading 2 (Ctrl+Shift+2)',
  },
  {
    format: 'block-quote',
    icon: <FormatQuote />,
    isBlock: true,
    shortcut: 'Quote (Ctrl+Shift+.)',
  },
  {
    format: 'numbered-list',
    icon: <FormatListNumbered />,
    isBlock: true,
    shortcut: 'Numbered List (Ctrl+Shift+7)',
  },
  {
    format: 'bulleted-list',
    icon: <FormatListBulleted />,
    isBlock: true,
    shortcut: 'Bulleted List Ctrl+Shift+8)',
  },
];
