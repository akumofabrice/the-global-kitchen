import express from "express";

const app = express();

app.get("/api/recipes", (reg, res) =>{
    res.status(200).send("you got 10 recipes");
});

app.post("/api/recipes", (reg, res) =>{
    res.status(201).json({message:"Recipes created successfully"});
});

app.put("/api/recipes:id", (reg, res) =>{
    res.status().json({message:" recipes updated successfully"});
});

app.put("/api/recipes:id", (reg, res) =>{
    res.status(200).json({message:" recipes deleted successfully"});
});


app.listen(5001, () => {
    console.log("server started on PORP: 5001");
} );