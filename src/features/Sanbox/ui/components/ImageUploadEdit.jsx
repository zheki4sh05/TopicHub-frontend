import { useState } from "react";

import { useDispatch } from "react-redux";
import { delItem, saveItem } from "../../model/sandboxSlice";

import {Box, Grid2, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ImageUpload from "../../../../shared/ImageUpload/ui/ImageUpload";
import api from "../../../../app/util/apiPath";
import { deleteArticlePartImage } from "../../api/requests";

function ImageUploadEdit({item}) {
    const dispatch = useDispatch()
    const [state,setState] = useState()

    const addItem=(id)=>{
        const part = {...item, uuid: id}
        console.log(part)
        dispatch(delItem({created:item.created}))
        dispatch(saveItem(part))
    }

    const handleDelete=()=>{
        console.log(item.uuid)
        // dispatch(delItem({created:item.created}))
         dispatch(deleteArticlePartImage({
              partId:item.uuid
            }))
    }
    
    return (
         <Grid2 container sx={{ width: "100%", margin: "5px 0" }}>
            <ImageUpload
            
            title="Загрузить изображение"
            alt={item.value}
            size="300"
            urlGet={item.value}
            urlPost={api.sandbox.url.concat(api.sandbox.img)}
            handleLoadData={addItem}
            />
             <Grid2 size={1}>
        <Box sx={{ display: "flex", alignItems: "flex-start",marginLeft:"10px" }}>
         
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
         
            
        </Box>
        </Grid2>
      </Grid2>

       
    );
}

export default ImageUploadEdit;