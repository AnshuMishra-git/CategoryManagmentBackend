const childSubCategory = require("../models/childSubCategory");
const { ObjectId } = require('mongoose').Types;


module.exports.ChildSubCategoryFind = async (value, field = "_id") => {
    return await childSubCategory.find({
        [`${field}`]: value
    }).lean();
}

module.exports.ChildSubCategoryFindAll = async (value, field = "_id") => {
    return await childSubCategory.aggregate(
        [
            {
              '$lookup': {
                'from': 'subcategories', 
                'localField': 'subCategoryId', 
                'foreignField': '_id', 
                'as': 'subCatData'
              }
            }, {
              '$unwind': {
                'path': '$subCatData', 
                'preserveNullAndEmptyArrays': false
              }
            }, {
              '$lookup': {
                'from': 'categories', 
                'localField': 'categoryId', 
                'foreignField': '_id', 
                'as': 'catData'
              }
            }, {
              '$unwind': {
                'path': '$catData', 
                'preserveNullAndEmptyArrays': false
              }
            }, {
              '$project': {
                'name': 1, 
                '_id': 1, 
                'subCategoryId': '$subCatData._id', 
                'subCategoryName': '$subCatData.name', 
                'categoryId': '$catData._id', 
                'categoryName': '$catData.name'
              }
            }
          ]
    );
}

module.exports.ChildSubCategoryCreate = async (req) => {
    return await childSubCategory.create(req);
}


module.exports.ChildSubCategoryUpdate = async (Id, Data) => {
    return await childSubCategory.findOneAndUpdate({
        _id: ObjectId(Id)
    }, {
        ...Data
    }, {
        new: true
    }).lean();
}


// return departments.findByIdAndUpdate({ _id: _id }, { $set: data }, { new: true });


module.exports.ChildSubCategoryDelete = async (req) => {
    return await childSubCategory.findByIdAndDelete(req);
}
module.exports.ChildSubCategoryDeleteByCategory = async (req) => {
    return await childSubCategory.deleteMany(req);
}
