import { Container } from '@mui/material';

import { authType, iUser } from '../../@types';

interface Props {
  user: authType;
  profile: iUser;
}

const EditPage: React.FC<Props> = () => {
  return <Container>Edit User page to be implemented</Container>;
};

export default EditPage;
