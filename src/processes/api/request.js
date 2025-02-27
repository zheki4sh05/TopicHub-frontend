import DomainNames from "../../app/store/DomainNames";
import api from "../../app/util/apiPath";
import ApiRequestCreator from "../../app/util/requestFactory";

const apiFactory = new ApiRequestCreator(DomainNames.sandbox+"/template", api.sandbox.url);
export const createTemplate = apiFactory.createPostRequest(api.sandbox.create);