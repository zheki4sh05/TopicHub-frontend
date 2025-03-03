

import {Box, Grid2, IconButton, TextField, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMetaData, getPreviewId, getSandboxId, getTheme, setPreviewId } from "../../model/sandboxSlice";
import ImageUpload from "../../../../shared/ImageUpload/ui/ImageUpload";
import api from "../../../../app/util/apiPath";
import { deletePreview, findPreview } from "../../api/requests";
import Img from "../../../../shared/Img/ui/Img";
import ConfirmModal from "../../../../shared/ConfirmModal/ui/ConfirmModal";
function ArticlePreview() {
    const {t} = useTranslation()
    const dispatch = useDispatch();
    const metaData = useSelector(getMetaData)
    const [save, setSave] = useState(metaData.metaName.length>0);
    const [open, setOpen] = useState(false);
    const [state, setState] = useState(metaData.metaName);
    const id = useSelector(getSandboxId)
    const previewId = useSelector(getPreviewId)
    const [data, setData] = useState()
    const handleSave = () => {
    
  
      // dispatch(saveItem(part));
      setSave(true);
      
     
    };
    const handleEdit = () => {
      setSave(false);
    };
  
    const onChange = (event) => {
      setState(event.target.value);
    };
  
    const handleDelete=()=>{
      // if(state.trim().length!=0){
        setOpen(true)
      // }else{
      //   handlerAgree()
      // }
    }
    const handlerAgree=(id)=>{
      dispatch(deletePreview({
        id:id
      }))
      setState("")
      setOpen(false)
    }
    const handlerDisagree=()=>{
      setOpen(false)
    }

    useEffect(()=>{
      if(previewId!="" && previewId!=null){
        dispatch(findPreview({id:previewId}))
      }
       
    },[])

    const handleLoadMetaData=(id)=>{
        dispatch(setPreviewId({id:id}))
        dispatch(findPreview({id:id}))
    }
    
    return (  
        <Grid2 container sx={{ width: "100%", margin: "5px 0" }}>
                 <Grid2 size={1}>
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          {save ? (
            <>
             {/* <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton> */}
            </>
           
          ) : (
            <>
             {/* <IconButton
              onClick={handleSave}
              disabled={state.trim().length == 0}
            >
              <SaveIcon />
            </IconButton> */}
            </>
           
          )}
        </Box>
      </Grid2>
          {previewId!="" && previewId!=null ?
          <Img
            id={previewId}
            name={metaData.metaName}

          />  
          :
          null
        
        }

        <ImageUpload
        
        title="Загрузить превью статьи"
        alt={""}
        size="300"
        urlGet={""}
        urlPost={api.sandbox.url.concat(api.sandbox.preview)}
        params={{name:state, id: id+""}}
        handleLoadData={handleLoadMetaData}
        />
              <Grid2 size={10}>
        {metaData.metaName.length>0 ? (
          <Typography variant="body2" gutterBottom sx={{ width: "100%" }}>
            {metaData.metaName}
          </Typography>
        ) : (
          <TextField
            id="standard-multiline-static"
            label={t('input_preview')}
            multiline
            defaultValue={state}
            variant="standard"
            value={state}
            sx={{ width: "100%" }}
            onChange={onChange}
          />
        )}
      </Grid2>
         <Grid2 size={1}>
    <Box sx={{ display: "flex", alignItems: "flex-start",marginLeft:"10px" }}>
     
        <IconButton onClick={handleDelete} disabled={metaData.metaName==""}>
          <DeleteIcon />
        </IconButton>
     
        
    </Box>
       <ConfirmModal
            show={open}
            title={"Вы действительно хотите удалить превью статьи?"}
            body={"Удаление превью статьи"}
            data={{id:id}}
            handlerAgree={handlerAgree}
            handlerDisagree={handlerDisagree}
          />
    </Grid2>
  </Grid2> 

    );
}

export default ArticlePreview;