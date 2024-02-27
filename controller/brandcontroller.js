const Category = require('../models/Category');
const Subcategory = require('../models/Scate');
const Extracategory = require('../models/Ecate');
const Brand = require('../models/Brand');
const types = require('../models/Type');

module.exports.addBrand = async(req,res)=>{
    let category = await Category.find({});
    let subcategory = await Subcategory.find({});
    let extracategory = await Extracategory.find({});
    return res.render('addBrand',{
        cate : category,
        subcate : subcategory,
        extracate : extracategory
    })
}

module.exports.insertBrand = async(req,res)=>{
    try {
            req.body.isActive = true;
            req.body.currentDate = new Date().toLocaleString();
            req.body.updateDate = new Date().toLocaleString();
            await Brand.create(req.body);
            return res.redirect('back');
        //}
    }
    catch (error) {
        console.log(error);
        return res.redirect('back')    
    }
}

module.exports.viewBrand = async(req,res)=>{
    try {
        var search = "";
        if (req.query.search) {
            search = req.query.search;
        }
        if (req.query.page) {
            page = req.query.page;
        }
        else {
            page = 0;
        }
        var perPage = 5;
        let BrandData = await Brand.find({
            $or: [
                { "brandname": { $regex: ".*" + search + ".*", $options: "i" } },
            ]
        }).limit(perPage).skip(perPage * page).populate(['category', 'subcategory','extracategory']).exec();
        let totalBranddata = await Brand.find({
            $or: [
                { "brandname": { $regex: ".*" + search + ".*", $options: "i" } },
            ]
        }).countDocuments();
        return res.render('viewBrand', {
            brandData: BrandData,
            searchValue: search,
            totaldocument: Math.ceil(totalBranddata / perPage),
            currentPage: page,
        })
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.isActive = async(req,res)=>{
    try {
        if (req.params.id) {
            let active = await Brand.findByIdAndUpdate(req.params.id, { isActive: false });
            if (active) {
                console.log("Data Deactive Successfully");
                return res.redirect('back');
            }
            else {
                console.log("Record Not Deactive");
                return res.redirect('back');
            }
        }
        else {
            console.log("Params Id not Found");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.deActive = async(req,res)=>{
    try {
        if (req.params.id) {
            let active = await Brand.findByIdAndUpdate(req.params.id, { isActive: true });
            if (active) {
                console.log("Data Isactive Successfully");
                return res.redirect('back');
            }
            else {
                console.log("Record Not Deactive");
                return res.redirect('back');
            }
        }
        else {
            console.log("Params Id not Found");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.getecatadata = async(req,res)=>{
    //console.log(req.body)
    let ecatdata = await Extracategory.find({subcategory : req.body.subcatid});
   // console.log(subcatdata)
    var optionsdata =   `<option value="">Select</option>`
    ecatdata.map((v,i)=>{
        optionsdata += `<option value="${v.id}">${v.ecateName}</option>`
    })
    return res.json(optionsdata)
}

module.exports.gettype = async(req,res)=>{
    //console.log(req.body)
    let typedata = await types.find({brandname : req.body.brandid});
   // console.log(subcatdata)
    var optionsdata =   `<option value="">Select</option>`
    typedata.map((v,i)=>{
        optionsdata += `<option value="${v.id}">${v.typeName}</option>`
    })
    return res.json(optionsdata)
}

module.exports.updateBrand = async(req,res)=>{
    try {
        let brandData = await Brand.findById(req.params.id);
        console.log(brandData);
        if (brandData) {
            return res.render('updateBrand', {
                AdminData: brandData,
            })
        }
        else {
            console.log('Record Not Found');
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

module.exports.editBrandData = async(req,res)=>{
    try {
        req.body.updateDate = new Date().toLocaleString();
        let brandData = await Brand.findByIdAndUpdate(req.body.EditId, req.body);
        console.log(brandData);
        if (brandData) {
            console.log("Record & Image Update Succesfully");
            return res.redirect('/admin/brand/viewBrand');
        }
        else {
            console.log("Record Not Updated");
            return res.redirect('/admin/brand/viewBrand');
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('/admin/brand/viewBrand');
    }
}

module.exports.deleteBrand = async(req,res)=>{
    try{
        await Brand.findByIdAndDelete(req.params.id);
        return res.redirect("back");
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}