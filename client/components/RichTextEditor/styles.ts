import { makeStyles } from '@material-ui/core';

const fontSize = 18;

const styles = makeStyles(({ palette }) => {
  const color = palette.getContrastText('#2a363b');

  return {
    editable: { fontSize, padding: '7px 0' },
    noBorder: { border: 'none' },
    toolbar: { margin: '7px 3px' },
    bold: { fontWeight: 900, fontSize },
    code: {
      backgroundColor: '#2a363b',
      borderRadius: 4,
      color,
      fontFamily: 'Source Code Pro',
      fontSize: 14,
      overflowX: 'auto',
      padding: '2px 6px',
      whiteSpace: 'pre-wrap',
    },
    quote: {
      background: '#2a363b',
      borderLeft: `10px solid ${color}`,
      color,
      fontSize: 20,
      fontStyle: 'oblique',
      margin: '1.5em 10px',
      padding: '7px 10px',
    },
    contentImage: {
      display: 'block',
      margin: '0 auto',
      maxHeight: '20em',
      maxWidth: '100%',
    },
  };
});

export default styles;
