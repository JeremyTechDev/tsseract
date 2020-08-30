import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';

import ImgInfo from './ImgInfo';
import getRandomImg from '../../helpers/getRandomImg';
import useStyles from './styles';

interface BgData {
  color?: string;
  description?: string;
  img: string;
  link?: string;
  name?: string;
  raw?: string;
}

const Login = () => {
  const [bgData, setBgData] = useState<BgData>({ img: '' });
  const [loading, setLoading] = useState(false);
  const classes = useStyles({ bg: bgData.img });

  useEffect(() => {
    setLoading(true);
    const fetchBgData = async () => {
      setBgData(await getRandomImg());
      setLoading(false);
    };

    fetchBgData();
  }, []);

  return (
    (loading && (
      <CircularProgress size={100} className={classes.centered} />
    )) || (
      <Grid container className={classes.grid}>
        <Grid container xs={2} alignItems="flex-end">
          <ImgInfo bgData={bgData} />
        </Grid>
      </Grid>
    )
  );
};

export default Login;
