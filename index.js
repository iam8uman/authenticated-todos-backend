const express = require("express");
require("dotenv").config();

const app = new express();

const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get('/about',(req,res)=>{
    const jsonData=[
        {
            id:1,
            name:"suman",
            age:34,
        },
        {
            id:2,
            name:"suman",
            age:34,
        },
        {
            id:3,
            name:"suman",
            age:34,
        },
        {
            id:4,
            name:"suman",
            age:34,
        },
    ]
    res.json(jsonData)
})

app.listen(port, () => {
  console.log(`Server is running on port https://localhost:${port}`);
});
