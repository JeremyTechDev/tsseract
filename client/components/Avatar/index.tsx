import React, { useState, useContext } from 'react';
import Router from 'next/router';
import { Grid, Button } from '@material-ui/core';

import AppContext from '../../context';
import AvatarEditor from './Editor';
import AvatarPic from './Avatar';
import useStyles from './styles';
import { putRequest } from '../../lib/fetch';

const Avatar = () => {
  const classes = useStyles();
  const { state } = useContext(AppContext);
  const [pieces, setPieces] = useState(
    state.user?.avatar
      ? JSON.parse(state.user?.avatar)
      : {
          accessoriesType: '',
          clotheColor: '',
          clotheType: '',
          eyebrowType: '',
          eyeType: '',
          facialHairColor: '',
          facialHairType: '',
          hairColor: '',
          mouthType: '',
          skinColor: '',
          topType: '',
        },
  );

  const handleSave = () => {
    putRequest('/users', { avatar: JSON.stringify(pieces) })
      .then((res) => {
        if (res.status === 200) {
          Router.replace(`/profile/${state.user?._id}`);
        } else {
          console.error(res);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (newProp: object) => {
    setPieces((prev: {}) => Object.assign({}, prev, newProp));
  };

  return (
    <Grid container>
      <Grid item lg={1} md="auto" />

      <Grid item md={4} xs={12} container alignItems="center" justify="center">
        <AvatarPic size="550px" avatar={JSON.stringify(pieces)} />

        <Button
          className={classes.margin}
          color="primary"
          onClick={handleSave}
          variant="contained"
        >
          Save Avatar
        </Button>
      </Grid>

      <Grid item lg={6} md={8} xs={12}>
        <AvatarEditor pieces={pieces} handleChange={handleChange} />
      </Grid>

      <Grid item lg={1} md="auto" />
    </Grid>
  );
};

export default Avatar;
