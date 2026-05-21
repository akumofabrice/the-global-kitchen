import { ArrowLeftIcon, PlusIcon } from 'lucide-react';
import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import axios from 'axios'; 

const CreateRecipe = () => {
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [cookingtime, setCookingtime] = useState("");
    const [difficulty, setDifficulty] = useState("easy");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const isFormDirty = title || ingredients || instructions || cookingtime || category;

    const handleBackClick = (e) => {
        if (isFormDirty) {
            const confirmLeave = window.confirm("You have unsaved changes. Are you sure you want to leave?");
            if (!confirmLeave) {
                e.preventDefault();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !ingredients || !instructions || !cookingtime || !difficulty || !category) {
            toast.error("All fields are required");
            return;
        }
        
        setLoading(true);

        const formattedIngredients = ingredients
            .split('\n')
            .map(item => item.trim())
            .filter(item => item !== "");

        const formattedInstructions = instructions
            .split('\n')
            .map(item => item.trim())
            .filter(item => item !== "");

        try {
            await axios.post("http://localhost:5001/api/recipes", {
                title,
                ingredients: formattedIngredients,
                instructions: formattedInstructions,
                cookingtime,
                difficulty,
                category
            });
            
            toast.success("Recipe created successfully");
            navigate("/"); 
        } catch (error) {
            console.log("Error creating recipe", error);
            toast.error("Failed to create recipe");
        } finally {
            setLoading(false); 
        }
    };

  return (
    <div className='min-h-screen bg-base-200'>
        <div className='container mx-auto px-4 py-8'>
            <div className='max-w-2xl mx-auto'>
                <Link to={"/"} onClick={handleBackClick} className='btn btn-ghost mb-6'>
                    <ArrowLeftIcon className='size-5'/>
                    back to recipes
                </Link>

                <div className='card bg-base-100 shadow-md'>
                    <div className='card-body'>
                        <h2 className='card-title text-2xl mb-4'>Create new Recipe</h2>
                        <form onSubmit={handleSubmit}>
                            {/* Title */}
                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text font-medium'>Title</span>
                                </label>
                                <input 
                                    type="text"
                                    placeholder='Recipe name'
                                    className='input input-bordered'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required 
                                />
                            </div>

                            {/* Ingredients */}
                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text font-medium'>Ingredients</span>
                                </label>
                                <textarea 
                                    placeholder='Enter each ingredient on a new line&#10;e.g.&#10;2 eggs&#10;1 cup flour'
                                    className='textarea textarea-bordered h-32'
                                    value={ingredients}
                                    onChange={(e) => setIngredients(e.target.value)}
                                    required 
                                />
                            </div>

                            {/* Instructions */}
                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text font-medium'>Instructions</span>
                                </label>
                                <textarea 
                                    placeholder='Enter each step on a new line&#10;e.g.&#10;Boil water&#10;Mix dry ingredients together'
                                    className='textarea textarea-bordered h-40'
                                    value={instructions}
                                    onChange={(e) => setInstructions(e.target.value)}
                                    required 
                                />
                            </div>
                             
                            {/* Cooking Time */}
                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text font-medium'>Cooking Time (in minutes)</span>
                                </label>
                                <input 
                                    type="number"
                                    min="1"
                                    placeholder='e.g., 30, 60'
                                    className='input input-bordered'
                                    value={cookingtime}
                                    onChange={(e) => setCookingtime(e.target.value)}
                                    required 
                                />
                            </div>

                            {/* Difficulty */}
                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text font-medium'>Difficulty Level</span>
                                </label>
                                <select 
                                    className='select select-bordered w-full'
                                    value={difficulty}
                                    onChange={(e) => setDifficulty(e.target.value)}
                                    required
                                >
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="difficult">Difficult</option>
                                </select>
                            </div>

                            {/* Category */}
                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text font-medium'>Category</span>
                                </label>
                                <input 
                                    type="text"
                                    placeholder='e.g., Italian, Nigerian, Cameroonian, Dessert'
                                    className='input input-bordered'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required 
                                />
                            </div>

                            {/* Submit Actions */}
                            <div className='card-actions justify-end mt-6'>
                               <button 
                                 type='submit' 
                                 className='btn btn-primary gap-2' 
                                 disabled={loading}
                               >
                                 {loading ? "Creating..." : "Create Recipe"}
                                 <PlusIcon className="size-5" />
                               </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div> 
        </div>
    </div>
  )
}

export default CreateRecipe;