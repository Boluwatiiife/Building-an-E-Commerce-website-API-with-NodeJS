const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv/config");
const api = process.env.API_URL;
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

app.use(cors());
app.options("*", cors());

// middlewaree
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);

//Routes
const categoriesRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

//Routers
app.use(`${api}/products`, productRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

const { default: mongoose } = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("Database connection is ready!");
  })
  .catch((err) => console.log(err.message));

app.listen(3000, () => {
  console.log(api);
  console.log("server is runningggg");
});
