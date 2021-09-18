import { Box, Grid } from '@mui/material';
import { Piece } from 'avataaars';

import * as pieceItems from './pieces';
import { TabItem } from './TabPanel';
import useStyles from './styles';

interface ColorProps {
  backgroundColor: string;
}
export const Color: React.FC<ColorProps> = ({ backgroundColor }) => {
  const { bubbleColor } = useStyles();
  return <Box style={{ backgroundColor }} className={bubbleColor} />;
};

interface ColorSelectorProps {
  tab: number;
  handleChange: (props: object) => void;
}
export const ColorSelector: React.FC<ColorSelectorProps> = ({
  tab,
  handleChange,
}) => {
  return tab in pieceItems.tabsWithColors ? (
    <Box p={3}>
      <Grid container alignItems="flex-start" justifyContent="flex-start" spacing={1}>
        {pieceItems[
          tab === 7 || tab === 2 ? 'clothesAndHatsColor' : 'hairColors'
        ].map(({ type, colorCode, shared }) => {
          // To hide the colors that are not available for facial hair
          return shared === false && tab === 3 ? null : (
            <TabItem
              key={'color-' + type}
              onClick={() =>
                handleChange({ [pieceItems.tabsWithColors[tab]]: type })
              }
            >
              <Color backgroundColor={colorCode || ''} />
            </TabItem>
          );
        })}
      </Grid>
    </Box>
  ) : null;
};

interface GraphicSelectorProps {
  color: string;
  handleChange: (props: object) => void;
}
export const GraphicSelector: React.FC<GraphicSelectorProps> = ({
  color,
  handleChange,
}) => {
  return (
    <Box p={3}>
      <Grid container alignItems="flex-start" justifyContent="flex-start" spacing={1}>
        {pieceItems.graphics.map(({ type, text }) => (
          <TabItem
            key={'graphic-' + type}
            onClick={() => handleChange({ graphicType: type })}
            text={type || text}
          >
            <Piece
              avatarStyle="Circle"
              clotheColor={color}
              clotheType="GraphicShirt"
              graphicType={type}
              pieceType="clothe"
            />
          </TabItem>
        ))}
      </Grid>
    </Box>
  );
};
