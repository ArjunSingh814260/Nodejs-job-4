const address = async (req, res, next) => {
  var MongoClient = require("mongodb").MongoClient;
  var url =
    "mongodb+srv://ArjunSingh:EhCymlXmIoRzqhOk@databaseccluster.q75hq.mongodb.net/address";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Address");
    dbo
      .collection("customers")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;

        db.close();
        req.address = result;
        return next();
      });
  });
};

const userEmail = async (req, res) => {
  email = [];

  var MongoClient = require("mongodb").MongoClient;
  var url = `mongodb+srv://${process.env.USER_NAME}:${process.env.DB_PASSWORD}@databaseccluster.q75hq.mongodb.net/UserDb`;

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("UserData");
    dbo
      .collection("UserInfo")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;

        for (var key in result) {
          email[key] = result[key].email;
        }

        return res.status(200).json({
          address: req.address,
          email: email,
        });

        db.close();
      });
  });
};

module.exports = { address, userEmail };
