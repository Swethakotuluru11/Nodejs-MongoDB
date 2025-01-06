    
const express = require("express"); 
const rateLimit = require("express-rate-limit"); 
const app = express(); 
// request can be made in windowMS time. 
const limiter = rateLimit({ 
	max: 100, 
	windowMs: 60 * 60 * 1000, 
	message: "Too many request from this IP"
}); 

// Add the limiter function to the express middleware 
// so that every request coming from user passes 
// through this middleware. 
app.use(limiter); 

// GET route to handle the request coming from user 
app.get("/", (req, res) => { 
	res.status(200).json({ 
		status: "success", 
		message: "Hello from the express server"
	}); 
}); 

// Server Setup 
const port = 8000; 
app.listen(port, () => { 
	console.log(`app is running on port ${port}`); 
});

