import DomainNames from "../../../app/store/DomainNames";
import api from "../../../app/util/apiPath";
import ApiRequestCreator from "../../../app/util/requestFactory";

const apiFactory = new ApiRequestCreator(DomainNames.sandbox, api.sandbox.url);
export const updateArticle = apiFactory.createPutRequest(api.sandbox.create);
export const editArticle = apiFactory.createPatchRequest(api.sandbox.edit)