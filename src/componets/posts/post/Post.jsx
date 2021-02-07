import React, {Fragment} from 'react'
import moment from 'moment'
//Material UI
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
//Redux
import {useDispatch} from 'react-redux'
import {deletePost, likePost} from '../../../redux/actions/posts'
//Styles
import useStyles from '../../../styles/post'


const Post = ({
  post, setCurrentId
}) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch();

  const handleMoreHorizonBtn = (currentId) => {
    setCurrentId(currentId)
    console.log(post)
  }

  const handleLikeBtn = (id) => {
   dispatch(likePost(id));
  }

  const handleDeleteBtn = (id) => {
    dispatch(deletePost(id));
  }

 const Likes = () => {

   if(post.likes.length > 0){

    return post.likes.find(like => like === (user?.result?.googleId || user?.result?._id))
    ? (
      <Fragment>
        <ThumbUpAltIcon
          fontSize='small'
        />&nbsp;{post.likes.length > 2 ? (`You and ${post.likes.length -1} others`) : (`${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`)}
      </Fragment>
    )
    : (
      <Fragment>
         <ThumbUpAltIcon
          fontSize='small'
          />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
      </Fragment>
    )
   }

   return <Fragment>
    <ThumbUpAltIcon 
      fontSize='small'    
    />&nbsp; Like
   </Fragment>
 }

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />

     <div className={classes.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>
          {moment(post.createAt).fromNow()}
        </Typography>
     </div>
    {
      (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
      <div className={classes.overlay2}> 
          <Button style={{color: 'white'}} size='small' onClick={() => handleMoreHorizonBtn(post._id)}>
            <MoreHorizIcon fontSize='default'/>
          </Button>
      </div>
      )
    }

     <div className={classes.details}>
        <Typography variant='body2' color='textSecondary' component='h2'>
          {post.tags ? post.tags.map(t => `#${t}`) : null}
        </Typography>
     </div>
     <Typography className={classes.title} variant='h5' gutterBottom component='h2'>
        {post.title}
     </Typography>

     <CardContent >
        <Typography variant='body2' color='textSecondary' component='p'>
          {post.message}
        </Typography>
     </CardContent>

     <CardActions className={classes.cardActions}>
      <Button
        size='small'
        color='primary'
        disabled={!user?.result}
        onClick={() => handleLikeBtn(post._id)}
      >
        <Likes />
      </Button>
      {
        (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (

          <Button
            size='small'
            color='secondary'
            onClick={() => handleDeleteBtn(post._id)}
          >
            <DeleteIcon fontSize='small'/> Delete
          </Button>
        )
        
      }
     </CardActions>
    </Card>
  )
}

export default Post
