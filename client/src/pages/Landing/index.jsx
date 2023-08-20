import React from 'react'
import './styles.css'
import RecipeCard from '../../components/RecipeCard'

function Landing() {
  return (
    <div className="landing-container">
    <RecipeCard/>
    <RecipeCard/>
    <RecipeCard/>
    <RecipeCard/>
    </div>
  )
}

export default Landing