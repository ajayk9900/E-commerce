const express = require('express');
const routs = express.Router();
const categoryController = require('../controller/categorycontroller');

routs.get('/addCategory', (req,res)=>{
    return res.render('addCategory');
});
routs.get('/isActive/:id',categoryController.isActive);
routs.get('/deActive/:id',categoryController.deActive);
routs.get('/viewCategory',categoryController.viewCate);
routs.post('/insertCategoryData',categoryController.insertCateData);
routs.get('/updateCategory/:id', categoryController.updateCategory);
routs.post('/editCatData',categoryController.editCatData);
routs.get('/deletCategory/:id', categoryController.deletCategory);
module.exports = routs