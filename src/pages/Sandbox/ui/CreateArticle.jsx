import { useDispatch, useSelector } from "react-redux";
import { isAuth } from "../../Profile/model/userSlice";
import SandboxContainer from "../../../features/Sanbox/ui/SandboxContainer";
import { createArticle } from "../../../features/Sanbox/api/requests";
import { useTranslation } from "react-i18next";

function CreateArticle() {
  const auth = useSelector(isAuth);
  const dispatch = useDispatch()
  const {t} = useTranslation()
  const saveHandler=({id,theme, keyWords,list, hub })=>{
    dispatch(
      createArticle({id,theme, keyWords,list, hub })
    );
  }
  return (

    <SandboxContainer
    
    auth={auth}
    actionHandler={saveHandler}
    title={t("article_creation")}
    />
  );
}

export default CreateArticle;
