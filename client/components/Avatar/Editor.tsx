import React, { useState } from 'react';
import { Paper, Divider, Tabs, Tab, Box } from '@material-ui/core';
import { Piece } from 'avataaars';

import * as pieceItems from './pieces';
import { Color, ColorSelector, GraphicSelector } from './Selectors';
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
          indicatorColor="primary"
          onChange={handleTabChange}
          textColor="primary"
          value={tab}
          variant="scrollable"
        >
          {pieceItems.labels.map((label) => (
            <Tab key={'label-' + label} label={label} />
          ))}
        </Tabs>
      </Paper>

      <Box className={classes.boxColor}>
        <ColorSelector tab={tab} handleChange={handleChange} />
        <Divider />
        {tab === 7 && pieces.clotheType === 'GraphicShirt' && (
          <GraphicSelector
            color={pieces.clotheColor}
            handleChange={handleChange}
          />
        )}
        <Divider />

        <TabPanel value={tab} index={0}>
          {pieceItems.skins.map(({ type, colorCode }) => (
            <TabItem
              key={'skin-' + type}
              onClick={() => handleChange({ skinColor: type })}
            >
              <Color backgroundColor={colorCode || ''} />
            </TabItem>
          ))}
        </TabPanel>

        <TabPanel value={tab} index={1}>
          {pieceItems.hairs.map(({ type, text }) => (
            <TabItem
              key={'hair-' + type}
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
          {pieceItems.hats.map(({ type, text }) => (
            <TabItem
              key={'hat-' + type}
              onClick={() => handleChange({ topType: type })}
              text={text || type}
            >
              <Piece
                avatarStyle="Circle"
                // @ts-ignore
                hatColor={pieces.hatColor || 'White'}
                pieceType="top"
                topType={type}
              />
            </TabItem>
          ))}
        </TabPanel>
        <TabPanel value={tab} index={3}>
          {pieceItems.facialHairs.map(({ type, text }) => (
            <TabItem
              key={'facialHair-' + type}
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
        <TabPanel value={tab} index={4}>
          {pieceItems.eyes.map(({ type, text }) => (
            <TabItem
              key={'eyes-' + type}
              onClick={() => handleChange({ eyeType: type })}
              text={text || type}
            >
              <Piece avatarStyle="Circle" pieceType="eyes" eyeType={type} />
            </TabItem>
          ))}
        </TabPanel>
        <TabPanel value={tab} index={5}>
          {pieceItems.eyebrows.map(({ type, text }) => (
            <TabItem
              key={'eyebrow-' + type}
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
        <TabPanel value={tab} index={6}>
          {pieceItems.mouths.map(({ type, text }) => (
            <TabItem
              key={'mouth-' + type}
              onClick={() => handleChange({ mouthType: type })}
              text={text || type}
            >
              <Piece avatarStyle="Circle" pieceType="mouth" mouthType={type} />
            </TabItem>
          ))}
        </TabPanel>
        <TabPanel value={tab} index={7}>
          {pieceItems.clothes.map(({ type, text }) => (
            <TabItem
              key={'clothe-' + type}
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
        <TabPanel value={tab} index={8}>
          {pieceItems.accessories.map(({ type, text }) => (
            <TabItem
              key={'accesory-' + type}
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
