import { useDispatch, useSelector } from "react-redux";
import { isAuth } from "../../Profile/model/userSlice";
import { getArticle } from "../../../features/Article/model/articleSlice";
import { useEffect } from "react";
import {
  saveTheme,
  setHub,
  saveAllItems,
  setKeywords,
  setId,
} from "../../../features/Sanbox/model/sandboxSlice";
import SandboxContainer from "../../../features/Sanbox/ui/SandboxContainer";
import { createArticle, updateArticle } from "../../../features/Sanbox/api/requests";
import { editArticle } from "../api/requests";
function EditArticle() {
  const auth = useSelector(isAuth);
  const article = useSelector(getArticle);
  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(editArticle({
        id:article.id,
        state:"",
        page:0
      }))
  },[])

  useEffect(()=>{
    
    if (article) {
        dispatch(setId(article.id))
        dispatch(saveTheme(article.theme))
        dispatch(setKeywords(article.keyWords.map((item)=> {return {id:item, name:item}})))
        dispatch(saveAllItems(article.list))
        dispatch(setHub(article.hub))
    }
    
  },[article,dispatch ])

  const handleSave = ({id, theme, keyWords, list, hub }) => {
    dispatch(
      createArticle({id:id,theme, keyWords,list, hub })
    );
  };

  return <SandboxContainer title={"Редактирование статьи"} actionHandler={handleSave} auth={auth} />;
}

export default EditArticle;
