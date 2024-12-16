const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser=require('body-parser');


const app = express();
app.use(bodyParser.json());
  
const SECRET_KEY = 'Swetha';

const users =[{ id:1 , username:'swetha1111',password:'Swe123'}];

app.post('/login',(req,res)=>{
    const {username,password}=req.body;
    const user= user.find(u=> u.username===username && u.password===password);
    console.log(user);
    if(user){
        const token=jwt.sign({id:user.id,username:user.username},SECRET_KEY,{expiresIN: '1h'});
        res.json({ token});

    }
    else{
        res.token(401).send('Invalid Credentials');

    }

});
app.get('/protected', (req, res) => {
    const token = req.headers['authorization'];
    if (token) {
      jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).send('Invalid token');
        } else {
          res.send('This is a protected route');
        }
      });
    } else {
      res.status(401).send('No token provided');
    }
});
  
app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});