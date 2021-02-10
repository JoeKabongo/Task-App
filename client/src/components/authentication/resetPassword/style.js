import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  hide: {
    display: 'none',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '50%',
  },
}));

export default useStyles;
