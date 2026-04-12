const exp = require("express");
const app = exp();
const cors = require("cors");

app.use(cors());

const mc = require("mongodb").MongoClient;
mc.connect('mongodb://127.0.0.1:27017')
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
const pdfApp =require('./API/pdfApi')

app.use('/userapi', userApp);
app.use('/pdfapi',pdfApp)

app.listen(4001, () => {
  console.log("Listening on port 4001");
});
