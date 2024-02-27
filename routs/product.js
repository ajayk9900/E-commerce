const express = require("express");
const routes = express.Router();
const product = require("../models/product");
const productcontroller = require("../controller/productcontroller");
const passport = require("passport");

routes.get("/add_product", productcontroller.add_product);

routes.get("/view_product", productcontroller.view_product);

routes.post("/insert_product",product.uploadimage,productcontroller.insert_product);

routes.post("/getBrandType", productcontroller.getBrandType);
routes.post("/deleteimg", productcontroller.deleteimg);
routes.get('/isActive/:id',productcontroller.isActive);
routes.get('/deActive/:id',productcontroller.deActive);
routes.get('/updateProduct/:id',productcontroller.updateProduct);
// routes.post('/edit_product',product.uploadimage,productcontroller.edit_product);
routes.get('/deleteProduct/:id',productcontroller.deleteProduct);
module.exports = routes;