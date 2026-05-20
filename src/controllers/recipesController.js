import Recipe from "../../models/Recipe.js";

export async function  getAllRecipes(reg, res) {
  try {
       const recipes = await Recipe.find()
       res.status(200).json(recipes)

  } catch (error) {
    console.error("Error in getAllRecipes controller",error);
    res.status(500).json({message: "internal server error"});
  }
}


export async function createRecipe(reg, res) {
  try {
        const {title,ingredients,instructions,cookingTime,difficulty,category} = reg.body
        const newRecipe = new Recipe({title,ingredients,instructions,cookingTime,difficulty,category})

        await newRecipe.save()
        res.status(201).json({message:"Recipe created successfully"})

  } catch (error) {
    console.error("Error in createRecipes controller",error);
    res.status(500).json({message: "internal server error"});

  }
    
  }

export async function  updateRecipe(req, res) {
  try {
    const {title,ingredients,instructions,cookingTime,difficulty,category} =req.body
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id,{title,ingredients,instructions,cookingTime,difficulty,category} ,{new:true})
    if(!updateRecipe) return res.status(404).json({message:"Recipe not found"})
    res.status(200).json({mesage: "Recipe updated successfully!"}); 

  } catch(error) {
    console.error("Error in updateRecipe contraller",error);
    res.status(500).json({message:"internal server error"})

  }

  }

export async function  deleteRecipe(req, res) {
  try {
    const {title,ingredients,instructions,cookingTime,difficulty,category} =req.body
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id,{title,ingredients,instructions,cookingTime,difficulty,category} )
    res.status(200).json({mesage: "Recipe deleted successfully!"}); 

  } catch (error) {
    console.error("Error in deleteRecipe controller",error);
    res.status(500).json({message:"internal server error"})

  }

}
