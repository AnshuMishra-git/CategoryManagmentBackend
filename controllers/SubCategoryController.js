
const message = require("../config/message");
const response = require("../modules/service/response");
const { SubCategoryCreate, SubCategoryFind, SubCategoryUpdate, SubCategoryDelete,
    SubCategoryFindAll, SubCategoryFindData } = require('../helpers/SubCategoryHelpers');

const {ChildSubCategoryDeleteByCategory} = require('../helpers/ChilSubCategoryHelper');    
// Read SubCategory
exports.SubCategoryGet = async function (req, res) {
    try {
        const{_id, name}= req.query;
        const Response = await _id ? await SubCategoryFindData(_id, name) : await SubCategoryFindAll();
        if (Response) return res.json(response.success(200, message.serverResponseMessage.DATA_READ, Response));
        else return res.json(response.success(204, message.serverResponseMessage.FAILURE_DATA_READ, 'err'));
    } catch (error) {
        return res.json(
            response.failure(204, message.serverResponseMessage.Catch_Error,error)
        );
    }
};

// Create SubCategory
exports.SubCategoryCreate = async function (req, res) {
    try {
        const isSubCategory = await SubCategoryFindData(req.body.name,'name');
        if (!isSubCategory.length) {
            const Response = await SubCategoryCreate(req.body); 
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

// Update SubCategory
exports.SubCategoryUpdate = async function (req, res) {
    try {

        const isSubCategory = await SubCategoryFindData(req.body._id);
        if (isSubCategory) {
            const { _id, name } = req.body;
            const Response = await SubCategoryUpdate(_id, req.body);
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

// Delete SubCategory

exports.SubCategoryDelete = async function (req, res) {
    try {
        const { _id } = req.params;
        const isSubCategory = await SubCategoryFindData(_id);
        if (isSubCategory && _id) {
            await ChildSubCategoryDeleteByCategory({subCategoryId:_id});
            const Response = await SubCategoryDelete(_id);
            if (Response) return res.json(response.success(200, message.serverResponseMessage.CASCADENING_DELETE_COMPLETE, Response));
            else return res.json(response.success(204, message.serverResponseMessage.FAILURE_DATA_DELETE, err));
        } else
            return res.json(response.success(204, message.serverResponseMessage.DATA_DOES_CANOTNOT_DELETE));
    } catch (error) {
        return res.json(
            response.failure(204, message.serverResponseMessage.Catch_Error, error)
        );
    }
};
