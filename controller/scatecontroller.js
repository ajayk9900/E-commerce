const Scate = require('../models/Scate');
const Category = require('../models/Category');


module.exports.addScate =  async(req,res)=>{
    var categoryData = await Category.find({});
    return res.render('addScate',{
        cateData : categoryData
    });
}
module.exports.insertData = async(req,res)=>{
    try {
        let scateData = await Scate.findOne({scateName : req.body.scateName});
        if(scateData){
            console.log('Sub Category Already Added');
            return res.redirect('back');
        }
        else{
            
            req.body.isActive = true;
            req.body.currentDate = new Date().toLocaleString();
            req.body.updateDate = new Date().toLocaleString();
            await Scate.create(req.body);
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}
module.exports.viewScate = async(req,res)=>{
    try {
        try {
            var search ="";
            if(req.query.search){
                search = req.query.search;
            }
            if(req.query.page){
                page = req.query.page;
            }
            else{
                page = 0;
            }
            var perPage = 12;
            let ScateData = await Scate.find({
                $or :[
                    {"scateName":{$regex : ".*"+search+".*",$options:"i"}},
                ]
            }).limit(perPage).skip(perPage*page).populate('category').exec();
            let totalScatedata = await Scate.find({
                $or :[
                    {"scateName":{$regex : ".*"+search+".*",$options:"i"}},
                ]
            }).countDocuments();
            
            return res.render('viewScate',{
                scateData : ScateData,
                searchValue : search,
                totaldocument : Math.ceil(totalScatedata/perPage),
                currentPage : page,
            })
        }
        catch (error) {
            console.log(error);
            return res.redirect('back');    
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}
module.exports.isActive = async(req,res)=>{
    try {
        if (req.params.id) {
            let active = await Scate.findByIdAndUpdate(req.params.id, { isActive: false });
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
            let active = await Scate.findByIdAndUpdate(req.params.id, { isActive: true });
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

module.exports.updateScate = async(req,res)=>{
    try {
        let scateData = await Scate.findById(req.params.id);
        console.log(scateData);
        if (scateData) {
            return res.render('updateScate', {
                AdminData: scateData,
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

module.exports.editScatData = async(req,res)=>{
    try {
        req.body.updateDate = new Date().toLocaleString();
        let catData = await Scate.findByIdAndUpdate(req.body.EditId, req.body);
        console.log(catData);
        if (catData) {
            console.log("Record & Image Update Succesfully");
            return res.redirect('/admin/scate/viewScate');
        }
        else {
            console.log("Record Not Updated");
            return res.redirect('/admin/scate/viewScate');
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('/admin/scate/viewScate');
    }
}

module.exports.deleteScate = async(req,res)=>{
    try{
        await Scate.findByIdAndDelete(req.params.id);
        return res.redirect("back");
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}