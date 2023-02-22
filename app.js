const express = require("express");
const app = express();
const user = require("./routes/userRoute");
const payment = require("./routes/paymentRoute");
const fund = require("./routes/fundRoute");
const tax = require("./routes/taxRoute");
const plan = require("./routes/planRoute");
const subscription = require("./routes/subscriptionRoute");
const errorMiddleWare = require("./middleware/error");
const notFoundError = require("./middleware/404");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
var favicon = require("serve-favicon");
const path = require("path");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/config.env" });
}

app.use(favicon(path.join(__dirname, "public", "icons", "carbon.png")));
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json("app is runnig");
});

app.use("/api/v1", user);
app.use("/api/v1", payment);
app.use("/api/v1", fund);
app.use("/api/v1", tax);
app.use("/api/v1", plan);
app.use("/api/v1", subscription);

app.use(notFoundError);
app.use(errorMiddleWare);

module.exports = app;
