// ||======================|| //
// ||                      || //
// ||   MONGOOSE RECIPES   || //
// ||         JSC          || //
// ||                      || //
// ||======================|| //



// Packages
require("dotenv").config();
const Express = require("express")
const app = Express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const SERVER_PORT = process.env.SERVER_PORT || 5000
const DB_PORT = process.env.DB_PORT || 27017

// Methods

console.log(mongoose.Types.ObjectId.is)


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/recipes", require("./routes/recipes"));


    //////////////
   //          //
  //   CODE   //
 //          //
//////////////


// MongoDB connection
mongoose
  .connect(`mongodb://localhost:${DB_PORT}/app_Recipes`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Connected to mongo on port ${DB_PORT}`))
  .catch(err => {
    throw err
  })


app.use((req, res) => res.status(404).json({ message: "Route not found" }))

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT} `);
})

