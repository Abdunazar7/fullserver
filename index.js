const express = require("express");
const mongoose = require("mongoose");
const CategoryRoute = require("./routes/category_route");
const ProductRoute = require("./routes/product_route");


mongoose
  .connect("mongodb+srv://abdunazaribrohimov7:h9dRpCeRIFK4AduY@cluster0.f8wjoyn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

const server = express();
server.use(express.json());


server.use("/category", CategoryRoute);
server.use("/product", ProductRoute);



server.listen(6000, () => {
  console.log("Server running on http://localhost:6000");
});