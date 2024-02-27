const express = require('express')
const routs = express.Router();
const brandcontroller = require('../controller/brandcontroller');


routs.get('/addBrand',brandcontroller.addBrand);
routs.post('/gettype',brandcontroller.gettype);
routs.get('/isActive/:id',brandcontroller.isActive);
routs.get('/deActive/:id',brandcontroller.deActive);
routs.post('/insertBrandData',brandcontroller.insertBrand);
routs.post('/getecatadata',brandcontroller.getecatadata);
routs.get('/viewBrand',brandcontroller.viewBrand);
routs.get('/updateBrand/:id', brandcontroller.updateBrand);
routs.post('/editBrandData', brandcontroller.editBrandData);
routs.get('/deleteBrand/:id', brandcontroller.deleteBrand);

module.exports = routs;