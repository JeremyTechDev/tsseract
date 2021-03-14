import Image from 'next/image';
import { FC, ReactNode } from 'react';
import {
  Typography,
  Paper,
  AppBar,
  Toolbar,
  Grid,
  IconButton,
} from '@material-ui/core';
import { StarsRounded, MoreVert } from '@material-ui/icons';

interface Props {
  children: ReactNode;
}

const ChatLayout: FC<Props> = ({ children }) => {
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
                <StarsRounded fontSize="large" />
              </IconButton>

              <IconButton size="small">
                <MoreVert fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {children}

      <Paper></Paper>
    </div>
  );
};

export default ChatLayout;
