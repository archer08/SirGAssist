const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  connectDb: () => {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(process.env.MONGODB_URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      })
      .then(() => console.log("connected"));
  },
};
