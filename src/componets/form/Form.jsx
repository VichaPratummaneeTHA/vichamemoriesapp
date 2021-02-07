import React, {useState, useEffect} from 'react'
//Material UI
import {TextField, Button, Typography, Paper} from '@material-ui/core'
import FileBase from 'react-file-base64'
//Redux
import {useDispatch, useSelector} from 'react-redux'
import {createPost, updatePost} from '../../redux/actions/posts'
//Styles
import useStyles from '../../styles/form'

const Form = ({
  currentId, setCurrentId
}) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state) => (currentId ? (state.posts.find(p => p._id === currentId)) : (null)))
  const user = JSON.parse(localStorage.getItem('profile'))
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  })

  const handleOnChange = event => {
    const {name, value} = event.target;
    setPostData({
      ...postData,
      [name] : value
    })
  }

  const handleSelectFile = event => {
     const value = event.base64
     setPostData({ 
       ...postData, 
       selectedFile: value 
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if(!currentId){
      console.log(postData)
      dispatch(createPost({
        ...postData,
        name: user?.result?.name
      }))
      handleClear();
    }else{
      dispatch(updatePost(currentId, {
        ...postData,
        name: user?.result?.name
      }))
      handleClear();
    }
    setCurrentId(null)
  }

  const handleClear = () => {
  
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    })
    
    setCurrentId(null)
  }
 
  useEffect(() => {
    if(post){
      setPostData(post)
    }
  }, [post]);

  if(!user?.result?.name){
    return(
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please Sign In to Create your own memories and like other's memories ...
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={(event) => handleSubmit(event)}>
        <Typography variant='h6'>
          {currentId ? ('Edit a Memory') : ('Create a Memory')}
           
        </Typography>
        <TextField 
          name='title'
          variant="outlined" 
          label="Title" 
          fullWidth 
          value={postData.title || ''}
          onChange={(event) => handleOnChange(event)} 

        />
        <TextField 
          name='message'
          variant="outlined" 
          label="Message" 
          fullWidth
          multiline rows={4} 
          value={postData.message || ''}
          onChange={(event) => handleOnChange(event)} 
 
        />    
        <TextField 
          name='tags'
          variant="outlined" 
          label="Tags (coma separated)" 
          fullWidth 
          value={postData.tags || ''}
          onChange={(event) => setPostData({ ...postData, tags: event.target.value.split(',') })} 

        />
    

      <div className={classes.fileInput}>
        <FileBase
          type="file" 
          multiple={false} 
          onDone={(event) => handleSelectFile(event)}
        />
      </div>

      <Button 
      className={classes.buttonSubmit}
      variant="contained" 
      color="primary"
      size="large"
      type="submit" 
      fullWidth
      >
        Submit
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        fullWidth
        onClick={(e) => handleClear(e)}
      >
        Clear
      </Button>
      </form>
    </Paper>
  )
}

export default Form
