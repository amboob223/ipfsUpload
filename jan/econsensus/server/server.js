const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

app.post("/help",async(req,res)=>{
    const {name,phone,email,industry,bproblem} = req.body;
    const data = await pool.query(
    "INSERT INTO help( name,phone,email,industry,bproblem) VALUES($1,$2,$3,$4,$5) RETURNING *",
    [name,phone,email,industry,bproblem]
        ) 
    res.json(data.rows[0]);
 
})

app.listen("5000",()=>{
    console.log("server Works")
})

