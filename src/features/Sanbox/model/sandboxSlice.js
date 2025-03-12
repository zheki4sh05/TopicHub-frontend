import { createSlice } from "@reduxjs/toolkit";
import DomainNames from "../../../app/store/DomainNames";
import { createArticle, createArticlepart, deleteArticlePart, deleteArticlePartImage, deletePreview, findPreview } from "../api/requests";
import { createTemplate } from "../../../processes/api/request";
import { editArticle } from "../../../pages/Sandbox/api/requests";
//----state---
const initialState = {
  id:"",
  theme:"",
  hub:null,
  keywords:[],
  previewId:"",
  metaData:{
    metaName:""
  },
  list: [],
  components: [
    {
      id: 0,
      name: "Раздел",
      type: "part",
      value:""
     
    },
    {
      id: 1,
      name: "Aбзац",
      type: "paragraph",
      value:""
     
    },
    // {
    //   id: 2,
    //   name: "Cписок",
    //   type: "list",
    //   value:[]
    // },
    {
      id: 3,
      name: "Заголовок",
      type: "chapter",
      value:""
    },
    {
      id: 4,
      name: "Изображение",
      type: "img",
       value:""
    },
    {
      id: 5,
      name: "Загрузить изображение",
      type: "img_load",
       value:""
    }
  ],
  preview:{
    imageName:"",
    url:""
  },
  status: "idle",
  previewStatus:'idle',
  editStatus:'idle',
  templateStatus:'idle',
  error: null,
};
//-------------


const sandboxSlice = createSlice({
  name: DomainNames.sandbox,
  initialState,
  reducers: {
    setId(state,action){
      state.id = action.payload
  },
    saveTheme(state,action){
        state.theme = action.payload
    },
    saveItem(state, action) {

      const { created, value,uuid } = action.payload
      const existing = state.list.find(item => item.created === created)
      if (existing) {
        existing.value = value
        existing.uuid = uuid
      }else{
        state.list.push(action.payload);
      }
    },
    saveAllItems(state, action) {

      state.list=action.payload
    },
    setKeywords(state,action){
    
      state.keywords = action.payload
    },
    setHub(state,action){
      state.hub = action.payload
    },
    delItem(state,action){
      const { created } = action.payload
      state.list = state.list.filter(item=>item.created!==created)
    },
    setPreviewId(state,action){
      state.previewId = action.payload.id
    },
    resetSandBox(state,action){
      state.theme=""
      state.keywords=[]
      state.list = []
      state.status='idle'
      state.error=null
      state.hub = 0

      
    },
    
  },
  extraReducers(builder) {
    builder
      //---создание статьи-------------
      .addCase(createArticle.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
    //----------------------------------------
     //---создание шаблона статьи-------------
     .addCase(createTemplate.pending, (state, action) => {
      state.templateStatus = "loading";
    })
    .addCase(createTemplate.fulfilled, (state, action) => {
      state.templateStatus = "succeeded";
      state.id = action.payload.id
      state.theme = action.payload.theme
      state.hub = action.payload.hub
      state.previewId = action.payload.previewId
      state.keywords = action.payload.keyWords.map(item=>{ return {id:new Date().getTime(), name:item}})
      if(action.payload.list!=null){
        state.list = action.payload.list
      } else{
        state.list=[]
      }
    })
    .addCase(createTemplate.rejected, (state, action) => {
      state.templateStatus = "failed";
      state.error = action.error.message;
    })
  //----------------------------------------
       //---удаление части статьи-------------
       .addCase(deleteArticlePart.pending, (state, action) => {
        state.templateStatus = "loading";
      })
      .addCase(deleteArticlePart.fulfilled, (state, action) => {
        state.templateStatus = "succeeded";
        const  id  = action.payload
        state.list = state.list.filter(item=>item.uuid!==id)
      })
      .addCase(deleteArticlePart.rejected, (state, action) => {
        state.templateStatus = "failed";
        state.error = action.error.message;
      })
    //----------------------------------------
        //---удаление картинки статьи-------------
        .addCase(deleteArticlePartImage.pending, (state, action) => {
          state.templateStatus = "loading";
        })
        .addCase(deleteArticlePartImage.fulfilled, (state, action) => {
          state.templateStatus = "succeeded";
          const id = action.payload
          state.list = state.list.filter(item=>item.uuid!==id)
        })
        .addCase(deleteArticlePartImage.rejected, (state, action) => {
          state.templateStatus = "failed";
          state.error = action.error.message;
        })
      //----------------------------------------
       //---создание части статьи-------------
       .addCase(createArticlepart.pending, (state, action) => {
        state.templateStatus = "loading";
      })
      .addCase(createArticlepart.fulfilled, (state, action) => {
        state.templateStatus = "succeeded";
        const { created, value, uuid } = action.payload
        const existing = state.list.find(item => item.created === created)
        if (existing) {
          existing.uuid = uuid
          existing.value = value
        }else{
          state.list.push(action.payload);
        }
      })
      .addCase(createArticlepart.rejected, (state, action) => {
        state.templateStatus = "failed";
        state.error = action.error.message;
      })
    //----------------------------------------
    //--------запрос мета информации-----------
    .addCase(findPreview.pending, (state, action) => {
      state.templateStatus = "loading";
    })
    .addCase(findPreview.fulfilled, (state, action) => {
      state.templateStatus = "succeeded";
      state.metaData = action.payload
    })
    .addCase(findPreview.rejected, (state, action) => {
      state.templateStatus = "failed";
      state.error = action.error.message;
    })
    //-------------------------------------------
        //--------удаление preview-----------
        .addCase(deletePreview.pending, (state, action) => {
          state.previewStatus = "loading";
        })
        .addCase(deletePreview.fulfilled, (state, action) => {
          state.previewStatus = "succeeded";
          state.metaData = {metaName:""}
          state.previewId = ""
        })
        .addCase(deletePreview.rejected, (state, action) => {
          state.previewStatus = "failed";
          state.error = action.error.message;
        })
        //-------------------------------------------
        //--------редактировать статью-----------
        .addCase(editArticle.pending, (state, action) => {
        state.editStatus = "loading";
      })
      .addCase(editArticle.fulfilled, (state, action) => {
        state.editStatus = "succeeded";
      })
      .addCase(editArticle.rejected, (state, action) => {
        state.editStatus = "failed";
        state.error = action.error.message;
      });
      //-------------------------------------------

  },
});

export function getSandboxId(state) {
  return state[DomainNames.sandbox].id;
}
export function getSandboxList(state) {
  return state[DomainNames.sandbox].list;
}
export function getSandboxWords(state) {
  return state[DomainNames.sandbox].keywords;
}
export function getHub(state) {
  return state[DomainNames.sandbox].hub;
}
export function getSandboxComponents(state) {
    return state[DomainNames.sandbox].components;
  }
  export function getSandboxStatus(state) {
    return state[DomainNames.sandbox].status;
  }
  export function getTheme(state) {
    return state[DomainNames.sandbox].theme;
  }
  export function getTemplateStatus(state) {
    return state[DomainNames.sandbox].templateStatus;
  }
  export function getPreviewId(state){
    return state[DomainNames.sandbox].previewId;
  }
  export function getMetaData(state){
    return state[DomainNames.sandbox].metaData;
  }

  export function isHeaderPresent(state){
    return state[DomainNames.sandbox].theme.trim().length>0 && state[DomainNames.sandbox].hub!=null
  }

  export function isPresent(state) {
    return isHeaderPresent(state) && state[DomainNames.sandbox].list.length!=0
  }

export const { saveItem,delItem,saveTheme,setKeywords,resetSandBox,setHub, saveAllItems,setId,setPreviewId } = sandboxSlice.actions;

export default sandboxSlice.reducer;
