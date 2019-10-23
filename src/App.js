import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import FullScreenCircuralProgress from './components/FullScreenCircuralProgress'
import Snackbars from './components/Snackbars'
import ScrollToTop from './components/ScrollToTop'
import AppBar from './components/AppBar'
import Drawer from './components/Drawer'
import Dashboard from './views/Dashboard'
import AddRecipe from './views/AddRecipe'
import Recipes from './views/Recipes'
import UserRecipes from './views/UserRecipes'
import ChangePassword from './views/ChangePassword'
import Auth from './Auth'

const App = props => {
  return (
    <div>
      <Auth>
        <BrowserRouter>
          <AppBar />
          <Drawer />
          <Route path='/' exact component={Dashboard} />
          <Route path='/add-recipe' component={AddRecipe} />
          <Route path='/recipes' component={Recipes} />
          <Route path='/your-recipes/:id?' component={UserRecipes} />
          <Route path='/change-password' component={ChangePassword} />
        </BrowserRouter>
      </Auth>

      <FullScreenCircuralProgress />
      <Snackbars />
      <ScrollToTop />
    </div>
  )
}

export default App