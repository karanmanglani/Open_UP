const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
dotenv.config({ path: "./config.env" });

const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_password
);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log(con.connections);
    console.log("DB connection succesful!");
  });

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log("App is running on port ${port}");
});
