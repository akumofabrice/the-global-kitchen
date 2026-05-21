import Recipe from "../../models/Recipe.js";

// ==========================================
// GET ALL RECIPES
// ==========================================
export async function getAllRecipes(req, res) {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error in getAllRecipes controller", error);
    res.status(500).json({ message: "internal server error" });
  }
}

// ==========================================
// CREATE RECIPE
// ==========================================
export async function createRecipe(req, res) {
  try {
    const { title, ingredients, instructions, cookingtime, difficulty, category } = req.body;

    if (!title || !ingredients || !instructions || !cookingtime || !difficulty || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 1. Transform Instructions Array back into a single String for the schema
    const instructionsString = Array.isArray(instructions) 
      ? instructions.join('\n') 
      : instructions;

    // 2. Parse cookingtime into a pure Number
    const parsedCookingTime = parseInt(cookingtime, 10);

    // 3. Standardize lowercase frontend values ('easy', 'difficult') to schema Capitalized values ('Easy', 'Hard')
    let capitalizedDifficulty = "Easy";
    if (difficulty === "medium") capitalizedDifficulty = "Medium";
    if (difficulty === "difficult" || difficulty === "hard") capitalizedDifficulty = "Hard";

    const newRecipe = new Recipe({
      title,
      ingredients, // Stays an Array as your schema requires
      instructions: instructionsString, // Cast to String
      cookingTime: parsedCookingTime,   // Cast to Number
      difficulty: capitalizedDifficulty, // Maps to 'Easy' | 'Medium' | 'Hard'
      category
    });

    await newRecipe.save();
    res.status(201).json({ message: "Recipe created successfully" });

  } catch (error) {
    console.error("Error in createRecipes controller", error);
    res.status(500).json({ message: "internal server error", error: error.message });
  }
}

// ==========================================
// UPDATE RECIPE
// ==========================================
export async function updateRecipe(req, res) {
  try {
    const { title, ingredients, instructions, cookingtime, difficulty, category } = req.body;

    const updateFields = {};
    if (title) updateFields.title = title;
    if (category) updateFields.category = category;
    if (ingredients) updateFields.ingredients = ingredients;
    
    // Remap variations dynamically for updates
    if (instructions) {
      updateFields.instructions = Array.isArray(instructions) ? instructions.join('\n') : instructions;
    }
    if (cookingtime) {
      updateFields.cookingTime = parseInt(cookingtime, 10);
    }
    if (difficulty) {
      let capitalizedDifficulty = "Easy";
      if (difficulty === "medium") capitalizedDifficulty = "Medium";
      if (difficulty === "difficult" || difficulty === "hard") capitalizedDifficulty = "Hard";
      updateFields.difficulty = capitalizedDifficulty;
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedRecipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json({ message: "Recipe updated successfully!" }); 

  } catch (error) {
    console.error("Error in updateRecipe controller", error);
    res.status(500).json({ message: "internal server error", error: error.message });
  }
}

// ==========================================
// DELETE RECIPE
// ==========================================
export async function deleteRecipe(req, res) {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    
    if (!deletedRecipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json({ message: "Recipe deleted successfully!" }); 

  } catch (error) {
    console.error("Error in deleteRecipe controller", error);
    res.status(500).json({ message: "internal server error" });
  }
}