import Link from 'next/link';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link as MuiLink,
  Typography,
} from '@mui/material';

import Avatar from '../Avatar/Avatar';
import { iUser } from '../../@types';
import useStyles from './styles';

interface Props {
  user: iUser;
}

const UserCard: React.FC<Props> = ({ user }) => {
  const classes = useStyles();

  return (
    <Card className={classes.userCard} elevation={6}>
      <MuiLink color="textPrimary">
        <Link href={`/profile/${user.username}`}>
          <Grid container>
            <CardMedia>
              <Avatar avatar={user.avatar} />
            </CardMedia>

            <CardContent>
              <Typography>@{user.username}</Typography>
              <Typography variant="h4">{user.name}</Typography>
            </CardContent>
          </Grid>
        </Link>
      </MuiLink>
    </Card>
  );
};

export default UserCard;
