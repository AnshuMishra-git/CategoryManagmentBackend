const subCategory = require("../models/SubCategory");
const { ObjectId } = require('mongoose').Types;


module.exports.SubCategoryFindData = async (value, field = "_id") => {
    return await subCategory.find({
        [`${field}`]: value
    }).lean();
}

module.exports.SubCategoryFind = async (value, field = "_id") => {
    return await subCategory.aggregate(
        [
            {
                '$match': {
                    '_id': new ObjectId(value)
                }
            }, {
                '$lookup': {
                    'from': 'categories',
                    'localField': 'categoryId',
                    'foreignField': '_id',
                    'as': 'categoryData'
                }
            }, {
                '$unwind': {
                    'path': '$categoryData',
                    'preserveNullAndEmptyArrays': false
                }
            }, {
                '$group': {
                    '_id': {
                        '_id': '$_id',
                        'name': '$name',
                        'categoryId': '$categoryData._id',
                        'categoryName': '$categoryData.name'
                    }
                }
            }
        ])
}

module.exports.SubCategoryFindAll = async () => {
    return await subCategory.aggregate([
        {
            '$lookup': {
                'from': 'categories',
                'localField': 'categoryId',
                'foreignField': '_id',
                'as': 'categoryData'
            }
        }, {
            '$unwind': {
                'path': '$categoryData',
                'preserveNullAndEmptyArrays': false
            }
        }, {
            '$project': {
                '_id': 1,
                'name': 1,
                'categoryName': '$categoryData.name'
            }
        }
    ]);
}

module.exports.SubCategoryCreate = async (req) => {
    return await subCategory.create(req);
}


module.exports.SubCategoryUpdate = async (Id, Data) => {
    return await subCategory.findOneAndUpdate({
        _id: ObjectId(Id)
    }, {
        ...Data
    }, {
        new: true
    }).lean();
}


// return departments.findByIdAndUpdate({ _id: _id }, { $set: data }, { new: true });


module.exports.SubCategoryDelete = async (req) => {
    return await subCategory.findByIdAndDelete(req);
}

module.exports.SubCategoryDeleteByData = async (req) => {
    return await subCategory.deleteMany(req);
}
