import React, { useState } from 'react';
import { Grid, Button, TextField, Fab } from '@material-ui/core';
import { Assignment, AssignmentTurnedIn } from '@material-ui/icons';

import CoverImgModal from '../CoverImgModal';
import useCopyToClipBoard from '../../hooks/useCopyToClipBoard';
import useStyles from './styles';

const UploadImage: React.FC = () => {
  const classes = useStyles();
  const [currImg, setCurrImg] = useState('');
  const [showImgModal, setShowImgModal] = useState(false);
  const [isCopied, handleCopy] = useCopyToClipBoard(2000);

  const openImgModal = () => {
    setCurrImg('');
    setShowImgModal(true);
  };

  return (
    <Grid container alignItems="center" justify="flex-start">
      <Button
        className={classes.margin}
        color="primary"
        onClick={openImgModal}
        variant="outlined"
      >
        Upload image
      </Button>
      <TextField
        className={classes.margin}
        disabled
        size="small"
        value={currImg}
        variant="outlined"
      />
      <Fab
        color="secondary"
        disabled={!currImg}
        onClick={() => handleCopy(currImg)}
        size="small"
        title="Copy Markdown for Image"
      >
        {isCopied ? <AssignmentTurnedIn /> : <Assignment />}
      </Fab>

      {showImgModal && (
        <CoverImgModal
          img={currImg}
          open={setShowImgModal}
          requireCaption
          setImg={setCurrImg}
        />
      )}
    </Grid>
  );
};

export default UploadImage;
