import express from "express";
import recipesRoutes from "./routes/recipesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import cors from "cors"

dotenv.config();

console.log(process.env.MONGO_URI);
const app = express();
const PORT = process.env.PORT || 5001;
 
connectDB()
// middleware
app.use(express.json());
app.use(cors({origin: "http://localhost:5173"}));

app.use("/api/recipes", recipesRoutes);



//app.get("/api/recipes", (reg, res) =>{
 //   res.status(200).send("you got 10 recipes");
// });

// app.post("/api/recipes", (reg, res) =>{
 //   res.status(201).json({message:"Recipes created successfully"});
// });

// app.put("/api/recipes:id", (reg, res) =>{
//    res.status().json({message:" recipes updated successfully"});
// });

// app.put("/api/recipes:id", (reg, res) =>{
//    res.status(200).json({message:" recipes deleted successfully"});
// });


app.listen(PORT, () => {
    console.log("server started on PORT:",PORT);
} );