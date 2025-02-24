import DomainNames from "../../../app/store/DomainNames";
import api from "../../../app/util/apiPath";
import ApiRequestCreator from "../../../app/util/requestFactory";



const apiFactory = new ApiRequestCreator(DomainNames.article, api.article.url);
export const commentArticle = apiFactory.createPostRequest(api.article.comment);


const apiFactory2 = new ApiRequestCreator(DomainNames.article, api.article.url);
export const findArticle = apiFactory2.createGetRequest(api.article.find,true);