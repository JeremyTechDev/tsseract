import React from 'react';
import Avataaar from 'avataaars';

interface Props {
  size?: string;
  avatar: string;
}
const Avatar: React.FC<Props> = ({ size = '100px', avatar }) => {
  return (
    <Avataaar
      avatarStyle="Circle"
      style={{ width: size, height: size }}
      {...JSON.parse(avatar || '{}')}
    />
  );
};

export default Avatar;
