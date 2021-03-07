import Avataaar from 'avataaars';

interface Props {
  size?: string;
  avatar: string | object;
}
const Avatar: React.FC<Props> = ({ size = '100px', avatar }) => {
  const avatarProps: object =
    typeof avatar === 'string' ? JSON.parse(avatar || '{}') : avatar;

  return (
    <Avataaar
      avatarStyle="Circle"
      style={{ width: size, height: size }}
      {...avatarProps}
    />
  );
};

export default Avatar;
