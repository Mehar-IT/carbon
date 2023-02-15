const mongoose = require("mongoose");

const connectDatabase = () => {
  const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose.set("strictQuery", false);

  mongoose.connect(process.env.DB_URL, option).then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
  });
};

module.exports = connectDatabase;
