const joi = require('joi');
exports.createChildSubCategory = joi.object({
  name: joi.string().required(),
  categoryId: joi.string().required(),
  subCategoryId: joi.string().required(),
});


exports.updateChildSubCategory = joi.object({
  name: joi.string().required(),
  _id : joi.string().required(),
  categoryId: joi.string().optional(),
  subCategoryId: joi.string().optional(),
});
