import { useDispatch, useSelector } from "react-redux";
import {
  getHub,
  getSandboxId,
  getSandboxList,
  getSandboxStatus,
  getSandboxWords,
  getTemplateStatus,
  getTheme,
  isHeaderPresent,
  isPresent,
  resetSandBox,
} from "../../model/sandboxSlice";

import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PathConstants } from "../../../../app/pathConstants";
import { updateArticle } from "../../api/requests";
import statusTypes from './../../../../app/util/statusTypes';

function SaveArticle({ action }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const empty = useSelector(isPresent);
  const id = useSelector(getSandboxId)
  const theme = useSelector(getTheme);
  const keyWords = useSelector(getSandboxWords);
  const list = useSelector(getSandboxList);
  const hub = useSelector(getHub);
  const sandboxStatus = useSelector(getSandboxStatus);
  const [backDrop, setBackdrop] = useState(false);
  const [isEdit,setEdit] = useState(false)

  const handleClose = () => {
    setBackdrop(false);
  };
  const handleOpen = () => {
    setBackdrop(true);
  };

  const handleSave = () => {
    action({
      id,
      theme,
      keyWords: keyWords.map((word) => word.name),
      list,
      hub: hub,
    });
  };

  useEffect(() => {
    console.log(sandboxStatus)
    if (sandboxStatus == statusTypes.loading) {
      handleOpen();
    } else if (sandboxStatus == statusTypes.succeeded) {
      handleClose();
      dispatch(resetSandBox());
      navigate(PathConstants.PROFILE);
    } else if (sandboxStatus == statusTypes.failed) {
      handleClose();
    }
  }, [sandboxStatus]);


  const isHeader = useSelector(isHeaderPresent)

  
  function sendRequestPerSeconds() {
 
    setTimeout(function() {
  
       dispatch(updateArticle({
        id,
        theme,
        keyWords: keyWords.map((word) => word.name),
        hub,
       }))
       setEdit(false)
    }, 5000); 
}
useEffect(()=>{
  if(isHeader && isEdit){
    sendRequestPerSeconds()
 }
},[isEdit])
useEffect(()=>{
    // if(isHeader){
    //   sendRequestPerSeconds()
    // }
    setEdit(true)
},[theme,keyWords,hub])


  return (
    <>
      <Button
        variant="contained"
        disabled={!empty}
        onClick={handleSave}
        sx={{ marginBottom: "20px" }}
      >
        Опубликовать
      </Button>

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={backDrop}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default SaveArticle;
