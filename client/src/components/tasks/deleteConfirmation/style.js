import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'fixed',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
    '& > *': {
      margin: theme.spacing(1),
    },
    zIndex: '10',
    display: 'flex',
    justifyContent: 'center' /* aligns on vertical for column */,
    alignItems: 'center' /* aligns on horizontal for column */,
  },
  root: {
    backgroundColor: 'white',
    padding: '30px',
    width: 'auto',
  },

  cover: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'none',
    opacity: 0.3,
    background: '#000',
  },
  hide: {
    display: 'none',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default useStyles;
