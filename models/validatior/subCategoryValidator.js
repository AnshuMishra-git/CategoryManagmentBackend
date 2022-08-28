const joi = require('joi');
exports.createSubCategory = joi.object({
  name: joi.string().required(),
  categoryId: joi.string().required(),
  // _id: joi.string().required(),
});


exports.updateSubCategory = joi.object({
  name: joi.string().required(),
  _id: joi.string().required(),
  categoryId: joi.string().optional(),
});
