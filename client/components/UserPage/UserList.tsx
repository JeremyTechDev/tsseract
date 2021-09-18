import { memo } from 'react';
import { Box, Typography, Grid } from '@mui/material';

import UserCard from './UserCard';

interface Props {
  users: object;
  view: 'Following' | 'Followers';
}

const UserList: React.FC<Props> = ({ users, view }) => {
  const parsedUsers = Object.entries(users);
  return (
    <Box>
      <Typography variant="h2">{view}</Typography>

      {parsedUsers.length === 0 && (
        <Typography>There are no users to display</Typography>
      )}

      <Grid container>
        {parsedUsers.map(([key, user]) => {
          return <UserCard key={key} user={user} />;
        })}
      </Grid>
    </Box>
  );
};

export default memo(UserList);
