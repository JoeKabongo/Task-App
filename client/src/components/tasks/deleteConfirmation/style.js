import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#fff',
    padding: '20px',
    zIndex: '3',
    '& > *': {
      margin: theme.spacing(1),
    },
    overflow: 'auto',
  },

  cover: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'none',
    opacity: 0.3,
    zIndex: '2',
    background: '#000',
  },
  hide: {
    display: 'none',
  },
}));

export default useStyles;
