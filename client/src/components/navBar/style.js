import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: 300,
    fontWeight: 'bold',
    height: '100%',
    position: 'fixed',
    backgroundColor: '#F5F5F5',
    top: 0,
    left: 0,
  },
  item: {
    fontWeight: 'bold',
  },
  link: {
    textDecoration: 'none',
    color: '#000',
  },
});

export default useStyles;
