const express = require('express');
const { resolve } = require('path');
const connectDB = require('./db.js')
const User = require('./schema.js')
const dotenv = require('dotenv')

const app = express();
const port = 3010;
dotenv.config();

app.use(express.static('static'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/api/users', async (req, res) => {
  const { name, email, password} = req.body;

  if(!name || !email || !password){
    return res.status(400).send("Validation Error: Enter the required details")
  }
  if(typeof name != "string" || typeof email != "string" || typeof password != "string"){
    return res.status(400).send("Validation Error: Invalid data type")
  }

  const userExists = await User.findOne({email: email});
  if(userExists){
    return res.status(400).send("User already exists");
  }
  
  try{
    await User.create({
      name: name,
      email: email,
      password: password
    })
    return res.status(201).send("User created successfully");
  }catch(err){
    console.log(`Error in User creation: ${err}`);
    return res.status(500).send("Server Error");
  }
});

app.listen(port, () => {
  connectDB();
  console.log(`Example app listening at http://localhost:${port}`);
});
