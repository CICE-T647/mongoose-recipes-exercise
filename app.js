//Requerimos las librerias necesarias para trabajar
require("dotenv").config();
const Express = require("express");
const app = Express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const SERVER_PORT = process.env.SERVER_PORT || 5000
const DB_PORT = process.env.DB_PORT || 27017;

//Inicializamos body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//rutas
const routing = require("./routes/recipes.js");

//metodos de las rutas
app.use("/recipes", routing);

//configuramos conexión con Mongo
mongoose.connect(`mongodb://localhost:${DB_PORT}/app`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => console.log(`Connected to mongo on port ${DB_PORT}`))
.catch( err => {
    throw err;
});

//gestionamos las rutas no configuradas
app.use((request, response) => {
    response.status(404).json({message: "Ruta no encontrada."});
});

app.listen(SERVER_PORT, () => {
    console.log(`Servidor escuchando por el puerto ${SERVER_PORT}`);
});




