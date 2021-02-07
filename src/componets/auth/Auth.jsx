import React, {Fragment, useState} from 'react'
import {useHistory} from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';
//Materail UI
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
//Styles
import useStyles from '../../styles/auth'
//Components
import Inputs from './Inputs'
import Icon from './Icon'
//Redux
import {useDispatch} from 'react-redux'
import {signup, signin} from '../../redux/actions/auth'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const Auth = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [formData, setFormData] = useState(initialState)
  const [isSingUp, setsingUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
    
  }

  const handleSwitchMode = () => {
    setsingUp(!isSingUp)
    setShowPassword(false)
  }

  const handleOnchange = (event) => {
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name] : value
    })
   }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(isSingUp){
      dispatch(
        signup(formData, history)
      )
    }else{
      dispatch(
        signin(formData, history)
      )
    }
  }

  const handleGoogleSuccess = async (res) => {
    const result = res?.profileObj
    const token = res?.tokenId
    console.log(res)
    
    try {
      dispatch({
        type: 'AUTH',
        data: {
          result, token
        }
      })

      history.push('/')
    } catch (error) {
      
    }
  }
  const handleGoogleError = (error) => {
    console.log(error)
    console.log('google sing in error try it again ...')
  }


  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography 
            component='h1'
            variant='h5' 
          >
          { isSingUp ? 'Sing up' : 'Sing in'}
          </Typography>

          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {
                isSingUp && (
                   <Fragment>
                    <Inputs 
                      name="firstName"
                      label='First Name'
                      handleChange={handleOnchange}
                      type='text'
                      autoFocus
                      half
                    />
                    <Inputs 
                      name="lastName"
                      label='Last Name'
                      handleChange={handleOnchange}
                      type='text'
                      half
                    />
                   </Fragment> 
                )
              }

                 <Inputs 
                      name="email"
                      label='Email Address'
                      handleChange={handleOnchange}
                      type='email'
                    />
                 <Inputs 
                      name="password"
                      label='Password'
                      handleChange={handleOnchange}
                      handleShowPassword={handleShowPassword}
                      type={
                        showPassword ? ('text') : ('password')
                      }
                    />
                  {
                    isSingUp && (
                      <Inputs 
                      name="confirmPassword"
                      label='Confirm Password'
                      handleChange={handleOnchange}
                      type='password'
                    />
                    )
                  }
            </Grid>

            <Button 
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
            {isSingUp ? ('Sing up') : ('Sing in')}
            </Button>

            <GoogleLogin 
              clientId='783892457569-f0p7onhasq3ncmss8s3vho6ls9pdt4hu.apps.googleusercontent.com'
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  variant="contained"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                >
                  Google Sign In
                </Button>
              )
              }
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleError}
              cookiePolicy="single_host_origin"
            />

            <Grid container justify="flex-end">
              <Button onClick={handleSwitchMode}>
                  {isSingUp ? (
                    'Already have an account? Sign In'
                  ): (
                    "Don't have any account? Sign UP"
                  )} 
              </Button>
            </Grid>     
          </form>
      </Paper>
    </Container>
  )
}

export default Auth
