const express = require('express');

const app = express();
const port = 3000;

// GET endpoint
app.get('/', async (req, res) => {
    res.send("This endpoint works.")
});

// GET endpoint
// app.get('/squarenumber/:num', async (req, res) => {
//     let x = req.params.num;
//     res.json({"square":x*x});
// });
// GET endpoint
app.get('/squarenumber/:num', async (req, res) => {
    let x = req.params.num;
    if (isNaN(x)){
        throw Error("Input not a number")
    }

    res.json({"square":x*x});
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});