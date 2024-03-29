const express = require('express');
const routs = express.Router();
const scatecontroller = require('../controller/scatecontroller');
const Scategory = require('../models/Scate');
const Category = require('../models/Category');


routs.get('/addScate' ,scatecontroller.addScate);
routs.get('/isActive/:id',scatecontroller.isActive);
routs.get('/deActive/:id',scatecontroller.deActive);
routs.post('/insertScategoryData',scatecontroller.insertData);
routs.get('/viewScate',scatecontroller.viewScate);
routs.get('/updateScate/:id', scatecontroller.updateScate);
routs.post('/editScatData',scatecontroller.editScatData);
routs.get('/deleteScate/:id', scatecontroller.deleteScate);
module.exports =  routs;