import mongoose from "mongoose";

//1 create a schema
//2 model based off of that schema 


const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Recipe title is required'], // Validation rule: constraint
      trim: true, // Data hygiene: automatically strips accidental spaces
    },
    ingredients: {
      type: [String], // Proper utilization of BSON array data type
      required: [true, 'Ingredients list cannot be empty'],
    },
    instructions: {
      type: String,
      required: [true, 'Cooking instructions are required'],
    },
    cookingTime: {
      type: Number, // Data Type optimization: explicit number, not a string
      required: [true, 'Cooking time is required'],
      min: [1, 'Cooking time must be a positive number'], // Validation constraint
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty level is required'],
      enum: {
        values: ['Easy', 'Medium', 'Hard'], // Validation rule: explicit enum constraint
        message: '{VALUE} is not a valid difficulty level',
      },
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      index: true, // Indexing: defined on a field expected to handle heavy lookup filtering
    },
  },
  {
    // Proper utilization of BSON-specific properties: real Date types for tracking timestamps
    timestamps: true, 
  }
);

// Generating the Model from the BSON schema
const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;