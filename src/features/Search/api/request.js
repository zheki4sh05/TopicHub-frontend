import DomainNames from "../../../app/store/DomainNames";
import api from "../../../app/util/apiPath";
import ApiRequestCreator from "../../../app/util/requestFactory";


const apiFactory = new ApiRequestCreator(DomainNames.search, api.search.url);
export const searchRequest = apiFactory.createGetRequest(api.search.search,true);


const apiFactory2 = new ApiRequestCreator(DomainNames.search, api.image.url);
export const searchImageRequest = apiFactory2.createGetRequest(api.image.search,true);