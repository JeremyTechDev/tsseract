import Image from 'next/image';
import { FC, ReactNode, useState } from 'react';
import {
  Typography,
  Paper,
  TextField,
  AppBar,
  Toolbar,
  Grid,
  IconButton,
} from '@material-ui/core';
import { StarBorder, MoreVert, Send } from '@material-ui/icons';
import router from 'next/router';

import useStyles from './styles';

interface Props {
  children: ReactNode;
}

const ChatLayout: FC<Props> = ({ children }) => {
  const classes = useStyles();
  const [newMessageTitle, setNewMessageTitle] = useState('');

  return (
    <div>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Grid container alignItems="center" justify="space-between">
            <Image
              alt="Tsseract logo"
              height={80}
              priority
              objectFit="contain"
              src="/Main-aside/white_logo_transparent_background.png"
              width={180}
            />

            <Typography variant="h4">Home</Typography>

            <Grid item>
              <IconButton size="small" title="Top Messages">
                <StarBorder fontSize="large" />
              </IconButton>

              <IconButton size="small">
                <MoreVert fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {children}

      <Paper square className={classes.chatFooter}>
        <Grid alignItems="center" container justify="space-between">
          <Grid item xs={11}>
            <TextField
              fullWidth
              id="send-message"
              label="Write a message to share with everybody 🚀"
              margin="dense"
              onChange={(e) => setNewMessageTitle(e.target.value)}
              value={newMessageTitle}
              variant="outlined"
            />
          </Grid>

          <Grid container justify="center" item xs={1}>
            <IconButton
              onClick={() =>
                router.push(`/write-message?title=${newMessageTitle}`)
              }
              title="Send Message"
            >
              <Send />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ChatLayout;
