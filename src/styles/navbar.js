import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  [theme.breakpoints.down('sm')]:{
    appBar: {
      display: 'flex',
      flexDirection: 'column',
    },
    brandContainer: {
      display: 'flex',
      flexDirection: 'column'
    },
    image : {
      display: 'none',
    },
    heading : {
      fontSize: '1.2rem'
    },
    toolbar: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    profile: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '300px',
      alignItems: 'center',
    },
    userName: {
      fontSize: '1rem'
    },
  },
}));