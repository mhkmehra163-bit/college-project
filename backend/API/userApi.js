const express = require("express");
const userApp = express();

userApp.use(express.json());

userApp.get("/users", async (req, res) => {
  const usersCollectionObj = req.app.get('usersCollectionObj');
  
  const usersList = await usersCollectionObj.find().toArray();
  res.send({ message: "All Users", payload: usersList });
});


userApp.get("/users/:name", async (req, res) => {
  const usersCollectionObj = req.app.get('usersCollectionObj');
  
  const name = req.params.name;
  const user = await usersCollectionObj.findOne({ username: name });
  if(user)
  res.status(200).send({ payload: user });
else
  res.send({message:"User Not Found!!"})
});


userApp.post("/new-user",async(req,res)=>{
  const usersCollectionObj = req.app.get('usersCollectionObj');
 
    let newUser = req.body;
    let user = await usersCollectionObj.findOne({ username: newUser.username });
    if (user === null ) {
      await usersCollectionObj.insertOne(newUser);
      res.status(201).send({ message: "New User created" });
    } else {

      res.status(200).send({ message: "User already exists" }); 
    }
 
});

userApp.delete("/delete-user/:username",async(req,res)=>{
  const usersCollectionObj = req.app.get('usersCollectionObj')
  let userName =req.params.username;
  let check = await usersCollectionObj.findOne({username:userName})


  if(check )
    {
      usersCollectionObj.deleteOne({username:userName})
      res.status(200).send({message:"User Deleted.."})
    }
    else 
    {
      res.status(201).send({message:"User Not Found!"})
    }

})


userApp.put("/users/:name", async (req, res) => {
  const usersCollectionObj = req.app.get('usersCollectionObj');
  const userName = req.params.name;
  const newUser = req.body;

  try {
    const check = await usersCollectionObj.findOne({ name: userName });

    if (check) {
      await usersCollectionObj.updateOne({ name: userName }, { $set: { ...newUser } });
      res.send({ message: "User Updated.." });
    } else {
      res.send({ message: "User Not Found!" });
    }
  } catch (err) {
    res.status(500).send({ message: "Error updating user", error: err.message });
  }
});

module.exports = userApp;
