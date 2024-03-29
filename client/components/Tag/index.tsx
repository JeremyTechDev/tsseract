import { Link, Typography } from '@mui/material';

import { iTag } from '../../@types';
import useStyles from './styles';
import { getTagColor } from './getTagColor';

interface Props {
  tag: iTag;
}

const Tags: React.FC<Props> = ({ tag }: Props) => {
  const classes = useStyles();

  return (
    <Link underline="none" href={`/home?tag=${tag._id}`}>
      <Typography
        className={classes.tag}
        style={{ ...getTagColor(tag.name) }}
        variant="body1"
      >{`#${tag.name}`}</Typography>
    </Link>
  );
};

export default Tags;
