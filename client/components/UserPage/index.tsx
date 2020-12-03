import { Container } from '@material-ui/core';
import { iUser } from '../../@types';

interface Props {
  user: iUser;
}

const UserPage: React.FC<Props> = ({ user }) => {
  return <Container>{JSON.stringify(user)}</Container>;
};

export default UserPage;
