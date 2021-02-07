import React, {useState, useEffect} from 'react'
import imageAppbar from '../../images/memories.png'
import decode from 'jwt-decode'
import {Link, useHistory, useLocation} from 'react-router-dom'
//Materail UI
import {AppBar, Typography, Toolbar, Avatar, Button} from '@material-ui/core'
//Redux
import { useDispatch } from 'react-redux';

//Styles
import useStyles from '../../styles/navbar'

const getUserfromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  return user
}

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [user, setUser] = useState(getUserfromLocalStorage())
  console.log(user)

  const handleLogOut = () => {

    dispatch({
      type: 'LOGOUT'
    })

    history.push('/')
    setUser(null)
  }

  useEffect(() => {

    const token = user?.token
    //Check Token expeired

    if(token){
      const decodeToken = decode(token);

      if(decodeToken.exp * 1000 < new Date().getTime()){
        return handleLogOut()
      }
    }
    setUser(getUserfromLocalStorage())
  }, [location])
 
  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
    <div className={classes.brandContainer}>
      <Typography  
        className={classes.heading} 
        component={Link} to='/'
        variant='h4' 
        align='center'>Vicha Memories Blog
      </Typography>
      <img 
        className={classes.image} 
        src={imageAppbar} 
        alt="icon" 
        height='40'/>
    </div>

    <Toolbar className={classes.toolbar}>
    {
      user ? (
        <div className={classes.profile}>
          <Avatar
            className={classes.purple}
            alt={user.result.name}
            src={user.result.imageUrl}
          >
            {user.result.name.charAt(0)}
          </Avatar>

          <Typography
            className={classes.userName}
            variant="h6"
          >
          {user.result.name}
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogOut}
          >
          Logout
          </Button>
        </div>
        
      ) : (

          <Button 
            component={Link} 
            to="/auth" 
            variant="contained" 
            color="primary">
              Sign In
          </Button>
      )
    }

    </Toolbar>

  </AppBar>
  )
}

export default Navbar
