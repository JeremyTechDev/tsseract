import React, { useState } from 'react';
import Router from 'next/router';
import { Grid, Button } from '@material-ui/core';
import Avataaars from 'avataaars';

import AvatarEditor from './Editor';
import useStyles from './styles';
import { putRequest } from '../../lib/fetch';

const Avatar = () => {
  const classes = useStyles();
  const [pieces, setPieces] = useState({
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
  });

  const handleSave = () => {
    putRequest('/users', { avatar: JSON.stringify(pieces) })
      .then((res) => {
        if (res.status === 200) {
          Router.replace('/profile');
        } else {
          console.error(res);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (newProp: object) => {
    setPieces((prev) => Object.assign({}, prev, newProp));
  };

  return (
    <Grid container>
      <Grid item lg={1} md="auto" />

      <Grid item md={4} xs={12} container alignItems="center" justify="center">
        <Avataaars
          accessoriesType={pieces.accessoriesType}
          avatarStyle="Circle"
          clotheColor={pieces.clotheColor}
          clotheType={pieces.clotheType}
          eyebrowType={pieces.eyebrowType}
          eyeType={pieces.eyeType}
          facialHairColor={pieces.facialHairColor}
          facialHairType={pieces.facialHairType}
          hairColor={pieces.hairColor}
          mouthType={pieces.mouthType}
          skinColor={pieces.skinColor}
          style={{ width: '100%' }}
          topType={pieces.topType}
        />

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
