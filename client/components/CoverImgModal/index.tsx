import { useState } from 'react';
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
import isURL from 'is-url';

import useStyles from './styles';
import { InputChangeEvent } from '../../@types';

interface T {
  img: string;
  requireCaption?: boolean;
  open: React.Dispatch<React.SetStateAction<boolean>>;
  setImg: React.Dispatch<React.SetStateAction<string>>;
}

const CoverImg: React.FC<T> = ({ requireCaption, img, open, setImg }) => {
  const classes = useStyles();
  const [caption, setCaption] = useState('');

  const save = () => {
    if (requireCaption) setImg(`![alt text](${img} "${caption}")`);
    open(false);
  };

  const handleCaption = (event: InputChangeEvent) => {
    setCaption(event.target.value);
  };

  const handleImage = (event: InputChangeEvent) => {
    setImg(event.target.value);
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
            onChange={handleImage}
            value={img}
          />

          {img && (
            <>
              {(isURL(img) && (
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
            </>
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
                disabled={!isURL(img)}
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
