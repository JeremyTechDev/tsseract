import React, { useState } from 'react';
import {
  Backdrop,
  Button,
  Container,
  Fade,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { BrokenImage } from '@material-ui/icons';

import useStyles from './styles';
import { imgExists } from '../../helpers/imgExists';

interface T {
  coverImg: string;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  setCoverImg: React.Dispatch<React.SetStateAction<string>>;
}

const CoverImg: React.FC<T> = ({ coverImg, handleClose, setCoverImg }) => {
  const classes = useStyles();
  const [imgFound, setImgFound] = useState(Boolean(coverImg));

  const handleImage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value: url } = event.target;

    setCoverImg(url);
    setImgFound(imgExists(url));
  };

  const clearImg = () => {
    handleClose(false);
    setCoverImg('');
  };

  return (
    <Modal
      aria-describedby="Add cover image to the post"
      aria-labelledby="Cover Image Modal"
      className={classes.modal}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
      closeAfterTransition
      onClose={() => handleClose(false)}
      open={true}
    >
      <Fade in={true}>
        <Paper className={classes.paper}>
          <Typography paragraph variant="subtitle1">
            Copy an image URL and paste it here
          </Typography>

          <TextField
            fullWidth
            label="Cover URL"
            onChange={handleImage}
            value={coverImg}
          />

          {coverImg && (
            <React.Fragment>
              {(imgFound && (
                <img
                  alt="Cover Image"
                  className={classes.coverImg}
                  src={coverImg}
                />
              )) || (
                <Grid
                  className={classes.padding}
                  container
                  direction="column"
                  alignItems="center"
                >
                  <BrokenImage color="error" fontSize="large" />
                  <Typography color="error">Image not found</Typography>
                </Grid>
              )}
            </React.Fragment>
          )}

          <Container className={classes.modalBtns}>
            <Button onClick={clearImg} color="primary">
              Remove
            </Button>

            <Button
              color="primary"
              disabled={!coverImg || !imgFound}
              onClick={() => handleClose(false)}
              variant="contained"
            >
              Save
            </Button>
          </Container>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default CoverImg;
