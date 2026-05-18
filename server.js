import express from "express";

const app = express();

app.get("/api/recipes", (reg, res) =>{
    res.send("you got 10 recipes");
});

app.listen(5001, () => {
    console.log("server started on PORP: 5001");
} );