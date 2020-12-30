import React from 'react';
import { Grid } from '@material-ui/core';

import UserCard from './UserCard';

interface Props {
  users: object;
}

const UserList: React.FC<Props> = ({ users }) => {
  return (
    <Grid container>
      {Object.entries(users).map(([key, user]) => {
        return <UserCard key={key} user={user} />;
      })}
    </Grid>
  );
};

export default UserList;
