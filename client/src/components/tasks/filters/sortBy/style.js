import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
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

  container: {
    backgroundColor: 'white',
    padding: '30px',
    width: '500px',
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
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

export default useStyles;
