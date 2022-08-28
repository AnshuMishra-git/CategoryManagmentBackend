const joi = require('joi');
exports.createCategory = joi.object({
  name: joi.string().required(),
});
exports.updateCategory = joi.object({
  name: joi.string().required(),
  _id: joi.string().required(),
});
