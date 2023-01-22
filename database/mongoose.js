const mongoose = require("mongoose");

module.exports = {
  connectDb: () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },
};
