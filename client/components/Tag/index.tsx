import { Typography } from '@material-ui/core';

import { iTag } from '../../@types';
import useStyles from './styles';

const colors = [
  '#007bff',
  '#17a2b8',
  '#28a745',
  '#343a40',
  '#6c757d',
  '#9b59b6',
  '#d35400',
  '#ffc107',
];

interface Props {
  tag: iTag;
}

const Tags: React.FC<Props> = ({ tag }: Props) => {
  const classes = useStyles();

  return (
    <Typography
      className={classes.tag}
      variant="body1"
      style={{
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      }}
    >{`#${tag.name}`}</Typography>
  );
};

export default Tags;
