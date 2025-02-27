import DomainNames from "../../../app/store/DomainNames";
import api from "../../../app/util/apiPath";
import ApiRequestCreator from "../../../app/util/requestFactory";

const apiFactory = new ApiRequestCreator(DomainNames.sandbox, api.sandbox.url);
export const createArticle = apiFactory.createPostRequest(api.sandbox.publish);
export const updateArticle = apiFactory.createPutRequest(api.sandbox.update);
export const createArticlepart = apiFactory.createPostRequest(api.sandbox.part);
export const findPreview = apiFactory.createGetRequest(api.sandbox.img,true);
export const deletePreview = apiFactory.createDeleteRequest(api.sandbox.preview,true);

const apiFactory2 = new ApiRequestCreator(DomainNames.sandbox+'/del', api.sandbox.url);
export const deleteArticlePart = apiFactory2.createDeleteRequest(api.sandbox.part,true)


const apiFactory3 = new ApiRequestCreator(DomainNames.sandbox+'/img', api.sandbox.url);
export const deleteArticlePartImage = apiFactory3.createDeleteRequest(api.sandbox.img,true)