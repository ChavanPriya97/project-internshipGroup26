const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const route = require("./routes/route");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://project2_intershipGroup:project2@cluster0.xvahxxz.mongodb.net/Group25Database",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Project2 mongoDB is connected"))
  .catch((err) => console.log({ error: err.message }));

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("express run on server " + (process.env.PORT || 3000));
});
