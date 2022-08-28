const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const childSubCategorySchema = new Schema(
    {
        name: {
            type: String,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'category'
        },
        subCategoryId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'subCategory'
        },
    },
    {
        timestamps: true,
    }

);




const childSubCategory = mongoose.model("childSubCategory", childSubCategorySchema);

module.exports = childSubCategory;