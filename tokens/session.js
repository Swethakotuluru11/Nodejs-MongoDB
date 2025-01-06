const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const PORT = 4000;

// Initialization
app.use(cookieParser());

app.use(session({
    secret: "amar",
    saveUninitialized: true,
    resave: true
}));

// User Object

const user = {
    name: "Amar",
    Roll_number: 43,
    Address: "Pune"
};

// Login page
app.get("/login", (req, res) => {
    req.session.user = user;
    req.session.save();
    return res.send("Your are logged in");
});

app.get("/user", (req, res) => {
    const sessionuser = req.session.user;
    res.send(sessionuser);
});

// Logout page 
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.send("Your are logged out ");
});

// Host
app.listen(PORT, () => console.log(`Server at ${PORT}`));