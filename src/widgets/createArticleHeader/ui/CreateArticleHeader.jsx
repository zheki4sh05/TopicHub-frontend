import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getSandboxId, isHeaderPresent, isPresent, resetSandBox } from "../../../features/Sanbox/model/sandboxSlice";
import ConfirmModal from "../../../shared/ConfirmModal/ui/ConfirmModal";
import { clearTemplate } from "../api/request";
import ClearSandbox from "../../../features/Sanbox/ui/components/ClearSandbox";


function CreateArticleHeader({title}) {

    const [open,setOpen] = useState(false)
    const dispatch = useDispatch()
     const articleId = useSelector(getSandboxId)
  const handleClear = () => {

    setOpen(true)
 
  };
    const handlerAgree=()=>{
        dispatch(resetSandBox())
        dispatch(clearTemplate({
          articleId:articleId
        }))
        setOpen(false)
    }
    const handlerDisagree=()=>{
        setOpen(false)
    }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <ClearSandbox
        
        handleClear={handleClear}
        
        />
      </Box>

      <ConfirmModal
        show={open}
        title={t('txt_del_sandbox')}
        body={t('txt_del_sandbox_warn')}
        data={{}}
        handlerAgree={handlerAgree}
        handlerDisagree={handlerDisagree}
      />
    </>
  );
}

export default CreateArticleHeader;
