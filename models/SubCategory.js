const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const subCategorySchema = new Schema(
    {
        name: {
            type: String,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'category'
        },
    },
    {
        timestamps: true,
    }

);
const subCategory = mongoose.model("subCategory", subCategorySchema);

module.exports = subCategory;