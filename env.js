// const dotenv = require("dotenv");
// dotenv.config({ silent: true, path: "config/config.env" });
// console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/config.env" });
}
