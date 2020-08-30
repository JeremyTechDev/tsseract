import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';

import useStyles from './styles';
import getRandomImg from '../../helpers/getRandomImg';

interface BgData {
  color?: string;
  description?: string;
  full: string;
  link?: string;
  name?: string;
  raw?: string;
}

const Login = () => {
  const [bgData, setBgData] = useState<BgData>({ full: '' });
  const classes = useStyles({ bg: bgData.full });

  useEffect(() => {
    const fetchBgData = async () => {
      setBgData(await getRandomImg());
    };

    fetchBgData();
  }, []);

  return <Container className={classes.container}>Hola</Container>;
};

export default Login;
