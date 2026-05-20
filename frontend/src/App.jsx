import React from 'react'
import { Route,Routes } from 'react-router'

import HomePage from './pages/HomePage'
import CreateRecipe from './pages/CreateRecipe'
import ExistingRecipes from './pages/ExistingRecipes'
import RecipeDetail from './pages/RecipeDetail'

const App = () => {
  return (
    <div>

<Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Create" element={<CreateRecipe/>} />
            <Route path="/Recipes" element={<ExistingRecipes/>} />
            <Route path="/View/:id" element={<RecipeDetail/>} />
</Routes>
      
    </div>
  )
}

export default App
