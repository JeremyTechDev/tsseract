import { Typography } from '@material-ui/core';

import { iTag } from '../../@types';
import useStyles from './styles';
import { getTagColor } from './getTagColor';

interface Props {
  tag: iTag;
}

const Tags: React.FC<Props> = ({ tag }: Props) => {
  const classes = useStyles();

  return (
    <Typography
      className={classes.tag}
      style={{ ...getTagColor(tag.name) }}
      variant="body1"
    >{`#${tag.name}`}</Typography>
  );
};

export default Tags;
