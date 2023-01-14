const mongoose = require("mongoose")

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("DB Connection succesfully");
  })
  .catch((err) => {
    console.log('An error occured in DB connection', err);
  });
