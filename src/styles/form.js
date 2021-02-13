import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(1),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput:{
    width: '100%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: '10px'
  },
  [theme.breakpoints.down('sm')]:{
    paper:{
      minHeight: '100px',    
    },
    form: {
      marginTop: theme.spacing(5)
    },
  },
}))