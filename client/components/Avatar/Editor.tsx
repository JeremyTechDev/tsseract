import React, { useState } from 'react';
import { Paper, Divider, Tabs, Tab, Box, Grid } from '@material-ui/core';
import { Piece } from 'avataaars';

import * as pieceItems from './pieces';
import Color from './Color';
import useStyles from './styles';
import TabPanel, { TabItem } from './TabPanel';

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
          {pieceItems.labels.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Paper>

      <Box className={classes.boxColor}>
        {tab in pieceItems.tabsWithColors && (
          <Box p={3}>
            <Grid
              container
              alignItems="flex-start"
              justify="flex-start"
              spacing={1}
            >
              {pieceItems[tab === 6 ? 'clothesColor' : 'hairColors'].map(
                ({ type, colorCode, shared }) => {
                  // To hide the colors that are not available for facial hair
                  return shared === false && tab === 2 ? null : (
                    <TabItem
                      key={type}
                      onClick={() =>
                        handleChange({ [pieceItems.tabsWithColors[tab]]: type })
                      }
                    >
                      <Color backgroundColor={colorCode || ''} />
                    </TabItem>
                  );
                },
              )}
            </Grid>
          </Box>
        )}

        <Divider />

        <TabPanel value={tab} index={0}>
          {pieceItems.skins.map(({ type, colorCode }) => (
            <TabItem
              key={type}
              onClick={() => handleChange({ skinColor: type })}
            >
              <Color backgroundColor={colorCode || ''} />
            </TabItem>
          ))}
        </TabPanel>

        <TabPanel value={tab} index={1}>
          {pieceItems.hairs.map(({ type, text }) => (
            <TabItem
              key={type}
              onClick={() => handleChange({ topType: type })}
              text={text || type}
            >
              <Piece
                avatarStyle="Circle"
                hairColor={pieces.hairColor}
                pieceType="top"
                topType={type}
              />
            </TabItem>
          ))}
        </TabPanel>

        <TabPanel value={tab} index={2}>
          {pieceItems.facialHairs.map(({ type, text }) => (
            <TabItem
              key={type}
              onClick={() => handleChange({ facialHairType: type })}
              text={text || type}
            >
              <Piece
                avatarStyle="Circle"
                facialHairColor={pieces.facialHairColor}
                facialHairType={type}
                pieceType="facialHair"
              />
            </TabItem>
          ))}
        </TabPanel>

        <TabPanel value={tab} index={3}>
          {pieceItems.eyes.map(({ type, text }) => (
            <TabItem
              key={type}
              onClick={() => handleChange({ eyeType: type })}
              text={text || type}
            >
              <Piece avatarStyle="Circle" pieceType="eyes" eyeType={type} />
            </TabItem>
          ))}
        </TabPanel>

        <TabPanel value={tab} index={4}>
          {pieceItems.eyebrows.map(({ type, text }) => (
            <TabItem
              key={type}
              onClick={() => handleChange({ eyebrowType: type })}
              text={text || type}
            >
              <Piece
                avatarStyle="Circle"
                eyebrowType={type}
                pieceType="eyebrows"
              />
            </TabItem>
          ))}
        </TabPanel>

        <TabPanel value={tab} index={5}>
          {pieceItems.mouths.map(({ type, text }) => (
            <TabItem
              key={type}
              onClick={() => handleChange({ mouthType: type })}
              text={text || type}
            >
              <Piece avatarStyle="Circle" pieceType="mouth" mouthType={type} />
            </TabItem>
          ))}
        </TabPanel>

        <TabPanel value={tab} index={6}>
          {pieceItems.clothes.map(({ type, text }) => (
            <TabItem
              key={type}
              onClick={() => handleChange({ clotheType: type })}
              text={text || type}
            >
              <Piece
                avatarStyle="Circle"
                clotheColor={pieces.clotheColor}
                clotheType={type}
                pieceType="clothe"
              />
            </TabItem>
          ))}
        </TabPanel>

        <TabPanel value={tab} index={7}>
          {pieceItems.accessories.map(({ type, text }) => (
            <TabItem
              key={type}
              onClick={() => handleChange({ accessoriesType: type })}
              text={text || type}
            >
              <Piece
                accessoriesType={type}
                avatarStyle="Circle"
                pieceType="accessories"
              />
            </TabItem>
          ))}
        </TabPanel>
      </Box>
    </React.Fragment>
  );
};

export default Editor;
