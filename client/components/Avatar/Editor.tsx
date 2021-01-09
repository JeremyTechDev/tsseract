import React, { useState, ReactNode } from 'react';
import {
  Paper,
  Divider,
  Tabs,
  Tab,
  Box,
  Grid,
  Button,
} from '@material-ui/core';
import { Piece } from 'avataaars';

import {
  skins,
  hairs,
  facialHairs,
  eyes,
  clothes,
  eyebrows,
  mouths,
  hairColors,
  accessories,
  clothesColor,
} from './pieces';
import Color from './Color';
import useStyles from './styles';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}
interface iProto {
  children: ReactNode;
  text: string;
  onClick: (prop: object) => void;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Grid
            container
            alignItems="flex-start"
            justify="flex-start"
            spacing={4}
          >
            {children}
          </Grid>
        </Box>
      )}
    </div>
  );
};

const Proto = ({ children, onClick, text }: iProto) => {
  return (
    <Grid item xs={6} md={2}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Button onClick={onClick}>{children}</Button>
        {text}
      </Grid>
    </Grid>
  );
};

interface Props {
  pieces: any;
  handleChange: (newProp: object) => void;
}

const Editor: React.FC<Props> = ({ handleChange, pieces }) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);

  const handleTabChange = (_: any, newTab: number) => {
    setTab(newTab);
  };

  return (
    <React.Fragment>
      <Paper elevation={4}>
        <Tabs
          centered
          indicatorColor="primary"
          onChange={handleTabChange}
          textColor="primary"
          value={tab}
          variant="scrollable"
        >
          <Tab label="Skin" />
          <Tab label="Hair" />
          <Tab label="Facial Hair" />
          <Tab label="Eyes" />
          <Tab label="Eyebrows" />
          <Tab label="Mouth" />
          <Tab label="Clothes" />
          <Tab label="Accessories" />
        </Tabs>
      </Paper>
      <Box className={classes.boxColor}>
        {(tab === 1 || tab === 2) && (
          <Box p={3}>
            <Grid
              container
              alignItems="flex-start"
              justify="flex-start"
              spacing={1}
            >
              {hairColors.map(({ type, colorCode, shared }) => {
                // To hide the colors that are not available for facial hair
                return shared === false && tab === 2 ? null : (
                  <Proto
                    key={type}
                    text=""
                    onClick={() =>
                      handleChange({
                        [tab === 1 ? 'hairColor' : 'facialHairColor']: type,
                      })
                    }
                  >
                    <Color backgroundColor={colorCode || ''} />
                  </Proto>
                );
              })}
            </Grid>
          </Box>
        )}
        {tab === 6 && (
          <Box p={3}>
            <Grid
              container
              alignItems="flex-start"
              justify="flex-start"
              spacing={1}
            >
              {clothesColor.map(({ type, colorCode }) => (
                <Proto
                  key={type}
                  text=""
                  onClick={() => handleChange({ clotheColor: type })}
                >
                  <Color backgroundColor={colorCode || ''} />
                </Proto>
              ))}
            </Grid>
          </Box>
        )}
        <Divider />
        <TabPanel value={tab} index={0}>
          {skins.map(({ type, text }) => (
            <Proto
              key={type}
              text={text || type}
              onClick={() => handleChange({ skinColor: type })}
            >
              <Piece
                avatarStyle="Circle"
                key={type}
                pieceSize="100"
                pieceType="skin"
                skinColor={type}
              />
            </Proto>
          ))}
        </TabPanel>
        <TabPanel value={tab} index={1}>
          {hairs.map(({ type, text }) => (
            <Proto
              key={type}
              text={text || type}
              onClick={() => handleChange({ topType: type })}
            >
              <Piece
                key={type}
                avatarStyle="Circle"
                pieceType="top"
                pieceSize="100"
                topType={type}
                hairColor={pieces.hairColor}
              />
            </Proto>
          ))}
        </TabPanel>
        <TabPanel value={tab} index={2}>
          {facialHairs.map(({ type, text }) => (
            <Proto
              key={type}
              text={text || type}
              onClick={() => handleChange({ facialHairType: type })}
            >
              <Piece
                key={type}
                avatarStyle="Circle"
                pieceType="facialHair"
                pieceSize="100"
                facialHairType={type}
                facialHairColor={pieces.facialHairColor}
              />
            </Proto>
          ))}
        </TabPanel>
        <TabPanel value={tab} index={3}>
          {eyes.map(({ type, text }) => (
            <Proto
              key={type}
              text={text || type}
              onClick={() => handleChange({ eyeType: type })}
            >
              <Piece
                key={type}
                avatarStyle="Circle"
                pieceType="eyes"
                pieceSize="100"
                eyeType={type}
              />
            </Proto>
          ))}
        </TabPanel>
        <TabPanel value={tab} index={4}>
          {eyebrows.map(({ type, text }) => (
            <Proto
              key={type}
              text={text || type}
              onClick={() => handleChange({ eyebrowType: type })}
            >
              <Piece
                key={type}
                avatarStyle="Circle"
                pieceType="eyebrows"
                pieceSize="100"
                eyebrowType={type}
              />
            </Proto>
          ))}
        </TabPanel>
        <TabPanel value={tab} index={5}>
          {mouths.map(({ type, text }) => (
            <Proto
              text={text || type}
              onClick={() => handleChange({ mouthType: type })}
              key={type}
            >
              <Piece
                avatarStyle="Circle"
                pieceType="mouth"
                pieceSize="100"
                mouthType={type}
              />
            </Proto>
          ))}
        </TabPanel>
        <TabPanel value={tab} index={6}>
          {clothes.map(({ type, text }) => (
            <Proto
              text={text || type}
              onClick={() => handleChange({ clotheType: type })}
              key={type}
            >
              <Piece
                avatarStyle="Circle"
                pieceType="clothe"
                pieceSize="100"
                clotheType={type}
                clotheColor={pieces.clotheColor}
              />
            </Proto>
          ))}
        </TabPanel>
        <TabPanel value={tab} index={7}>
          {accessories.map(({ type, text }) => (
            <Proto
              text={text || type}
              onClick={() => handleChange({ accessoriesType: type })}
              key={type}
            >
              <Piece
                avatarStyle="Circle"
                pieceType="accessories"
                pieceSize="100"
                accessoriesType={type}
              />
            </Proto>
          ))}
        </TabPanel>
      </Box>
    </React.Fragment>
  );
};

export default Editor;
