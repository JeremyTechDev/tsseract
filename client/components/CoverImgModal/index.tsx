import React, { useState } from 'react';
import {
  Box,
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

interface T {
  requireCaption?: boolean;
  img: string;
  open: React.Dispatch<React.SetStateAction<boolean>>;
  setImg: React.Dispatch<React.SetStateAction<string>>;
}

const CoverImg: React.FC<T> = ({ requireCaption, img, open, setImg }) => {
  const classes = useStyles();
  const [caption, setCaption] = useState('');
  const [imgFound, setImgFound] = useState(Boolean(img));

  const save = () => {
    if (requireCaption) setImg(`![alt text](${img} "${caption}")`);
    open(false);
  };

  const handleCaption = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value: caption } = event.target;

    setCaption(caption);
  };

  const handleImage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value: url } = event.target;

    setImg(url);
    setImgFound(Boolean(url));

    // setImgFound(imgExists(url)); wanted change
  };

  const clearImg = () => {
    open(false);
    setImg('');
  };

  return (
    <Modal
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
      className={classes.modal}
      closeAfterTransition
      onClose={() => open(false)}
      open={true}
    >
      <Fade in={true}>
        <Paper className={classes.paper}>
          <Typography variant="subtitle1">
            Copy an image URL and paste it here
          </Typography>

          <TextField
            fullWidth
            label="Image URL"
            onChange={(event) => handleImage(event)}
            value={img}
          />

          {img && (
            <React.Fragment>
              {(imgFound && (
                <img alt="Image" className={classes.coverImg} src={img} />
              )) || (
                <Grid
                  alignItems="center"
                  className={classes.padding}
                  container
                  direction="column"
                >
                  <BrokenImage color="error" fontSize="large" />
                  <Typography color="error">Image not found</Typography>
                </Grid>
              )}
            </React.Fragment>
          )}

          <Container className={classes.modalBtns}>
            {requireCaption && (
              <TextField
                className={classes.txtBox}
                color="primary"
                label="Caption"
                onChange={handleCaption}
                value={caption}
              />
            )}

            <Box className={classes.btnBox}>
              <Button onClick={clearImg} color="primary">
                Remove
              </Button>

              <Button
                color="primary"
                disabled={(requireCaption && !caption) || !imgFound || !img}
                onClick={save}
                variant="contained"
              >
                Save
              </Button>
            </Box>
          </Container>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default CoverImg;