const exp = require("express");
const app = exp();
const cors = require("cors");

app.use(cors()); // keep simple for now

const mc = require("mongodb").MongoClient;

// ❗ Replace with your MongoDB Atlas URL directly
mc.connect("YOUR_MONGODB_ATLAS_URL")
  .then(client => {
    console.log("DB CONNECTED...!");

    const db = client.db('circularRepository');

    app.set('usersCollectionObj', db.collection('userCollection'));
    app.set('pdfCollection', db.collection('pdfCollection'));
  })
  .catch(err => {
    console.log("CONNECTION FAILED...!", err);
  });

const userApp = require('./API/userApi'); 
const pdfApp = require('./API/pdfApi');

app.use('/userapi', userApp);
app.use('/pdfapi', pdfApp);

// ❗ THIS IS COMPULSORY
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});