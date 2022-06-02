

const userSave = async (req, res) => {
  var data
  const path = req.file?.path;
  req.body.path = path;
  console.log(req.body);  
  const { fName, lName, email, gender, city, state, zip, country } = req.body;

  if (
    !fName ||
    !lName ||
    !email ||
    !gender ||
    !city ||
    !state ||
    !zip ||
    !country ||
    !req?.file.path ||
    !path
  ) {
    console.log(req.body);
    console.log("filed Error");
res.status(200).json({message:"please Enter",success:false});
  } else {
    var MongoClient = require("mongodb").MongoClient;
    var url = `mongodb+srv://${process.env.USER_NAME}:${process.env.DB_PASSWORD}@databaseccluster.q75hq.mongodb.net/UserDb`;

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("UserData");
      
      
      dbo.collection("UserInfo").findOne({ email: email }, function (err, result) {
          
        if (err) throw err;
        if (!result) {
        dbo.collection("UserInfo").insertOne(req.body, function (err, result) {
          if (err) throw err;
          console.log("1 document inserted");
          return res
            .status(201)
            .json({ message: "user Created", success: true });
          db.close();
        });
        }
        else {
          console.log("Email already exist");
          return res.send({ message: "Email already exists", success: true });
        }
        
        
      });
   
    });
  }
};

module.exports = userSave;
