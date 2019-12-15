require("dotenv").config();
const Express = require("express");
const app = Express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const DB_PORT = process.env.DB_PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use("/users", require("./routes/user"));

mongoose
  .connect(`mongodb://localhost:${DB_PORT}/recipes`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Connected to mongo on port ${DB_PORT}`))
  .catch(err => {
    throw err;
  });

app.use((req, res) => res.status(404).json({ message: "route not found" }));

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT} `);
});
