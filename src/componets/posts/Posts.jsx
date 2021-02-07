import React from 'react'
//Material UI
import {Grid, CircularProgress} from '@material-ui/core'
//Components
import Post from './post/Post'
//Redux
import {useSelector} from 'react-redux'
//Styles
import useStyles from '../../styles/posts'

const Posts = ({
  setCurrentId
}) => {
  const classes = useStyles();
  const posts = useSelector(state => state.posts)

  console.log(posts)
  return (
      !posts.length ? (
        <CircularProgress />
      ) : (
        <Grid 
          container
          className={classes.mainContainer}
          alignItems='stretch'
          spacing={3}
        >
        {
          posts.map(p => (
            <Grid 
              key={p._id}
              item xs={12} sm={6} md={6}            
            >
            <Post 
              post={p}
              setCurrentId={setCurrentId}
            />
            </Grid>
          ))
        }
        </Grid>
      )
    )
}

export default Posts
