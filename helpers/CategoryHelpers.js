const category = require("../models/Category");
const { ObjectId } = require('mongoose').Types;


module.exports.catgoryFind = async (value, field = "_id") => {
    return await category.find({
        [`${field}`]: value
    }).lean();
}

module.exports.catgoryFindAll = async (value, field = "_id") => {
    return await category.find({}).lean();
}

module.exports.catgoryCreate = async (req) => {
    return await category.create(req);
}


module.exports.catgoryUpdate = async (Id, Data) => {
    return await category.findOneAndUpdate({
        _id: ObjectId(Id)
    }, {
        ...Data
    }, {
        new: true
    }).lean();
}

module.exports.catgoryDelete = async (req) => {
    return await category.findByIdAndDelete(req);
}
