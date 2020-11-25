import { ReactNode } from 'react';
import { Typography } from '@material-ui/core';

import useStyles from './styles';

type ComponentType = { children: ReactNode };

export const Bold: React.FC<ComponentType> = ({ children }) => {
  const classes = useStyles();
  return (
    <Typography variantMapping={{ body1: 'span' }} className={classes.bold}>
      {children}
    </Typography>
  );
};

export const Code: React.FC<ComponentType> = ({ children }) => {
  const classes = useStyles();
  return (
    <Typography variantMapping={{ body1: 'span' }} className={classes.code}>
      {children}
    </Typography>
  );
};

export const Quote: React.FC<ComponentType> = ({ children }) => {
  const classes = useStyles();
  return <Typography className={classes.quote}>{children}</Typography>;
};

export const Heading1: React.FC<ComponentType> = ({ children }) => {
  return <Typography variant="h4">{children}</Typography>;
};

export const Heading2: React.FC<ComponentType> = ({ children }) => {
  return <Typography variant="h5">{children}</Typography>;
};

export const Image = ({ attributes, children, element }: any) => {
  const classes = useStyles();
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img className={classes.contentImage} src={element.url} />
      </div>
      {children}
    </div>
  );
};
