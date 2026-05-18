import express from "express";

const router = express.Router();

router.get("/", (reg, res) =>{
       res.status(200).send("you just fetched the recipes");
   });


router.post("/", (reg, res) =>{
      res.status(201).json({message:"Recipes created successfully"});
    });

router.put("/:id", (reg, res) =>{
       res.status(200).json({message:" recipes updated successfully"});
     });


router.delete("/:id", (reg, res) =>{
    res.status(200).json({message:" recipes deleted successfully"});
});     





export default router;