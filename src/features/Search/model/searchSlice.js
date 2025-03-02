import { createSlice } from "@reduxjs/toolkit";
import DomainNames from "../../../app/store/DomainNames";
import { fetchImagesPage, searchImageRequest, searchRequest } from "../api/request";


//----state---
const initialState = {
  result: {


  },
  images:{
    items:[]
  },
  options:{
    theme:"",
    author:"",
    keywords:""
  },
  image:{
    name:"",
  },
  target:"",
  status: "idle",
  error: null,
};
//-------------



const searchSlice = createSlice({
  name: DomainNames.search,
  initialState,
  reducers: {

    cleareSearch(state,action){
        state.result={}
        state.options={
            theme:"",
            author:"",
            keyWords:""
          }
        state.images={items:[]}
        state.image={name:""}
        state.status="idle"
        state.error=null

    },

    setSearchOptions(state,action){
        state.options=action.payload
    },
    setImageSearchOptions(state,action){
      state.image = action.payload
    }
    
  
  },
  extraReducers(builder) {
    builder
    //---поиск статей-------------
    .addCase(searchRequest.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(searchRequest.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.result = action.payload
        state.error=null
      })
      .addCase(searchRequest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
    //----------------------------------------
     //---поиск картинок-------------
     .addCase(searchImageRequest.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(searchImageRequest.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.images = action.payload
      state.error=null
    })
    .addCase(searchImageRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    })
    //----------------------------------------
      //---запрос картинок-------------
      .addCase(fetchImagesPage.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(fetchImagesPage.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.images = action.payload
      state.error=null
    })
    .addCase(fetchImagesPage.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    })
  //----------------------------------------
      
  },
});


export function getSearchResult(state) {
  return state[DomainNames.search].result;
}
export function getSearchImageResult(state) {
  return state[DomainNames.search].images;
}

export function getSearchOptions(state) {
    return state[DomainNames.search].options;
  }

export function getSearchImageOptions(state){
  return state[DomainNames.search].image;
}
  
export function getSearchStatus(state) {
  return state[DomainNames.search].status;
}
export function getSearchState(state) {
    return state[DomainNames.search].options.length ==0 && state[DomainNames.search].author.length==0 && state[DomainNames.search].keywords.length==0;
  }

export const { cleareSearch,setSearchOptions,setImageSearchOptions } = searchSlice.actions;

export default searchSlice.reducer;
