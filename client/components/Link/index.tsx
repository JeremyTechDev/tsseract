import { ReactNode, FC } from 'react';
import NextLink from 'next/link';
import MuiLink from '@material-ui/core/Link';

interface Props {
  href: string;
  color?: 'textPrimary' | 'textSecondary' | 'inherit' | 'primary' | 'secondary';
  children: ReactNode;
}

const Link: FC<Props> = ({ href, color = 'textPrimary', children }) => (
  <NextLink href={href}>
    <MuiLink style={{ cursor: 'pointer' }} color={color}>
      {children}
    </MuiLink>
  </NextLink>
);

export default Link;
