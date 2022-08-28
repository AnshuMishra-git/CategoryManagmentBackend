
const middleware = require('../modules/service/middleware');
const {
  categoryCreate,
  categoryUpdate,
  categoryDelete,
  categoryGet
}
  = require('../controllers/CategoryController')

const {
  SubCategoryCreate,
  SubCategoryUpdate,
  SubCategoryDelete,
  SubCategoryGet
}
  = require('../controllers/SubCategoryController')

const {
  ChildSubCategoryGet,
  ChildSubCategoryCreate,
  ChildSubCategoryUpdate,
  ChildSubCategoryDelete
}
  = require('../controllers/ChildSubCategoryControleller')

const {
  createCategory,
  updateCategory
} = require('../models/validatior/categoryValidator')
const {
  createSubCategory,
  updateSubCategory
} = require('../models/validatior/subCategoryValidator')
const {
  createChildSubCategory,
  updateChildSubCategory
} = require('../models/validatior/childSubCategoryValidator')

module.exports = (app) => {
  // Category Changes 
  app.get('/category/get', categoryGet);
  app.post('/category/create', middleware(createCategory), categoryCreate);
  app.put('/category/update', middleware(updateCategory), categoryUpdate);
  app.delete('/category/delete/:_id', categoryDelete);

  // Sub Category Changes

  app.get('/subCategory/get', SubCategoryGet);
  app.post('/subCategory/create', middleware(createSubCategory), SubCategoryCreate);
  app.put('/subCategory/update', middleware(updateSubCategory), SubCategoryUpdate);
  app.delete('/subCategory/delete/:_id', SubCategoryDelete);

  // Child Sub-Category Changes
  app.get('/childSubCategory/get', ChildSubCategoryGet);
  app.post('/childSubCategory/create', middleware(createChildSubCategory), ChildSubCategoryCreate);
  app.put('/childSubCategory/update', middleware(updateChildSubCategory), ChildSubCategoryUpdate);
  app.delete('/childSubCategory/delete/:_id', ChildSubCategoryDelete);
};