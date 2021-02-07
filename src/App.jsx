import React  from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
//Materail UI
import {Container} from '@material-ui/core'
//Components
import Navbar from './componets/navbar/Navbar'
import Home from './componets/home/Home'
import Auth from './componets/auth/Auth'


const App = () => {
 
  return (
    <BrowserRouter>
    <Container maxWidth='lg'>
      <Navbar />
      <Switch>
        <Route 
          path='/'
          exact component = {Home}
        />
        <Route 
          path='/auth'
          exact component = {Auth}
        />
      </Switch>
    </Container>

    </BrowserRouter>
  )
}

export default App
