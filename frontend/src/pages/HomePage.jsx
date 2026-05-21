import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RecipeCard from '../components/RecipeCard'
import axios from "axios"

const HomePage = () => {
  // fetch recipes
  const [recipes,setRecipes] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () =>{
      try {
        const res = await axios.get("http://localhost:5001/api/recipes");

        console.log(res.data);
        setRecipes(res.data);

      } catch (error) {
        console.error("Error fetching recipes",error);

      } finally {
        setLoading(false);
      }

    }
    fetchRecipes();
  },[]);

  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>loading recipes......</div>}

        {recipes.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {recipes.map((recipe) =>(
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}

          </div>
        )}

      </div>
    </div>
  )
}

export default HomePage
