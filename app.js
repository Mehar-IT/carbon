const express = require("express");
const app = express();
const user = require("./routes/userRoute");
const payment = require("./routes/paymentRoute");
const fund = require("./routes/fundRoute");
const tax = require("./routes/taxRoute");
const plan = require("./routes/planRoute");
const subscription = require("./routes/subscriptionRoute");
const ratio = require("./routes/ratioRoute");
const fiat = require("./routes/fiatRoute");
const errorMiddleWare = require("./middleware/error");
const notFoundError = require("./middleware/404");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
var favicon = require("serve-favicon");
const path = require("path");
const fileUpload = require("express-fileupload");

app.use(favicon(path.join(__dirname, "public", "icons", "carbon.png")));
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());
// app.use(fileUpload({ useTempFiles: true }));

app.get("/", (req, res) => {
  res.status(200).json("app is runnig");
});

app.use("/api/v1", user);
app.use("/api/v1", payment);
app.use("/api/v1", fund);
app.use("/api/v1", tax);
app.use("/api/v1", plan);
app.use("/api/v1", subscription);
app.use("/api/v1", ratio);
app.use("/api/v1", fiat);

app.use(notFoundError);
app.use(errorMiddleWare);

module.exports = app;
