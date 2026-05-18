export function  getAllRecipes(reg, res) {
    res.status(200).send("you just fetched the recipes");
}


export function createRecipe(reg, res) {
    res.status(201).json({message:"Recipes created successfully"});
  }

export function  updateRecipe(reg, res) {
    res.status(200).json({message:" recipes updated successfully"});
  }

export function  deleteRecipe(reg, res) {
    res.status(200).json({message:" recipes deleted successfully"});
  }
