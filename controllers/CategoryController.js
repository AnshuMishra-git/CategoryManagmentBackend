
const message = require("../config/message");
const response = require("../modules/service/response");
const { catgoryCreate, catgoryFind, catgoryUpdate, catgoryDelete,
    catgoryFindAll } = require('../helpers/CategoryHelpers')
const {SubCategoryDeleteByData} = require('../helpers/SubCategoryHelpers');
const {ChildSubCategoryDeleteByCategory} = require('../helpers/ChilSubCategoryHelper');
// Read Category
exports.categoryGet = async function (req, res) {
    try {
        const Response = await req.query._id ? await catgoryFind(req.query._id) : await catgoryFindAll();
        if (Response) return res.json(response.success(200, message.serverResponseMessage.DATA_READ, Response));
        else return res.json(response.success(204, message.serverResponseMessage.FAILURE_DATA_READ, err));
    } catch (error) {
        return res.json(
            response.failure(204, message.serverResponseMessage.Catch_Error, error)
        );
    }
};

// Create Category
exports.categoryCreate = async function (req, res) {
    try {
        const isCategory = await catgoryFind(req.body.name, 'name');
        if (!isCategory) {
            const Response = await catgoryCreate(req.body);
            if (Response) return res.json(response.success(200, message.serverResponseMessage.DATA_CREATED, Response));
            else return res.json(response.success(204, message.serverResponseMessage.FAILURE_DATA_CREATE, err));
        } else
            return res.json(response.success(204, message.serverResponseMessage.DATA_EXISTS));
    } catch (error) {
        return res.json(
            response.failure(204, message.serverResponseMessage.Catch_Error, error)
        );
    }
};

// Update Category
exports.categoryUpdate = async function (req, res) {
    try {

        const isCategory = await catgoryFind(req.body._id);
        if (isCategory && (isCategory.name != req.body.name)) {
            const { _id, name } = req.body;
            const Response = await catgoryUpdate(_id, { name: name });
            if (Response) return res.json(response.success(200, message.serverResponseMessage.DATA_UPDATE, Response));
            else return res.json(response.success(204, message.serverResponseMessage.FAILURE_DATA_UPDATE, err));
        } else
            return res.json(response.success(204, message.serverResponseMessage.DATA_DOES_NOT_EXISTS));
    } catch (error) {
        return res.json(
            response.failure(204, message.serverResponseMessage.Catch_Error, error)
        );
    }
};

// Delete Category

exports.categoryDelete = async function (req, res) {
    try {
        const { _id } = req.params;
        const isCategory = await catgoryFind(_id);
        if (isCategory && _id) {
            const Response = await catgoryDelete(_id);
            await SubCategoryDeleteByData({categoryId :_id })
            await ChildSubCategoryDeleteByCategory({categoryId:_id});
            if (Response) return res.json(response.success(200, message.serverResponseMessage.DATA_DELETE, Response));
            else return res.json(response.success(204, message.serverResponseMessage.FAILURE_DATA_DELETE, err));
        } else
            return res.json(response.success(204, message.serverResponseMessage.DATA_DOES_CANOTNOT_DELETE));
    } catch (error) {
        return res.json(
            response.failure(204, message.serverResponseMessage.Catch_Error, error)
        );
    }
};
