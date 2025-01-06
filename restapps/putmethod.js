const express = require('express');
app = express();

app.use(express.json())

let data = "Hello Word!";
app.get("/", (req, res) => {
	console.log(data);
	res.send(data);
})

app.put("/", (req, res) => {
	console.log(req.body);
	res.send("Data Recieved Successfully!");
})

app.listen(3000, () => { console.log("Server Connected!") });