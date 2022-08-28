
const childSubCategory = require("../models/childSubCategory");
const message = require("../config/message");
const response = require("../modules/service/response");
const { ChildSubCategoryCreate, ChildSubCategoryFind, ChildSubCategoryUpdate, ChildSubCategoryDelete,
    ChildSubCategoryFindAll } = require('../helpers/ChilSubCategoryHelper')


// Read ChildSubCategory
exports.ChildSubCategoryGet = async function (req, res) {
    try {
        const Response = await req.query._id ? await ChildSubCategoryFind(req.query._id) : await ChildSubCategoryFindAll();
        if (Response) return res.json(response.success(200, message.serverResponseMessage.DATA_READ, Response));
        else return res.json(response.success(204, message.serverResponseMessage.FAILURE_DATA_READ, err));
    } catch (error) {
        return res.json(
            response.failure(204, message.serverResponseMessage.Catch_Error, error)
        );
    }
};

// Create ChildSubCategory
exports.ChildSubCategoryCreate = async function (req, res) {
    try {
        const isChildSubCategory = await ChildSubCategoryFind(req.body.name,'name');
        if (!isChildSubCategory) {
            const Response = await ChildSubCategoryCreate(req.body);
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

// Update ChildSubCategory
exports.ChildSubCategoryUpdate = async function (req, res) {
    try {

        const isChildSubCategory = await ChildSubCategoryFind(req.body._id);
        if (isChildSubCategory) {
            const { _id, name } = req.body;
            const Response = await ChildSubCategoryUpdate(_id, req.body);
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

// Delete ChildSubCategory

exports.ChildSubCategoryDelete = async function (req, res) {
    try {
        const { _id } = req.params;
        const isChildSubCategory = await ChildSubCategoryFind(_id);
        if (isChildSubCategory && _id) {
            const Response = await ChildSubCategoryDelete(_id);
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
