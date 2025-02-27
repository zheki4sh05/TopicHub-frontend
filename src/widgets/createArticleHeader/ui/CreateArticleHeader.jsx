import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getSandboxId, isHeaderPresent, isPresent, resetSandBox } from "../../../features/Sanbox/model/sandboxSlice";
import ConfirmModal from "../../../shared/ConfirmModal/ui/ConfirmModal";
import { clearTemplate } from "../api/request";


function CreateArticleHeader() {

    const [open,setOpen] = useState(false)
    const dispatch = useDispatch()
     const isSandboxPresent = useSelector(isPresent)
     const headerPresent =  useSelector(isHeaderPresent)
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
        <Typography variant="h6">Создание статьи</Typography>
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={handleClear}
          disabled={!isSandboxPresent && !headerPresent}
        >
          Сбросить
        </Button>
      </Box>

      <ConfirmModal
        show={open}
        title={"Удаление шаблона статьи"}
        body={"Вы действительно хотите удалить все?"}
        data={{}}
        handlerAgree={handlerAgree}
        handlerDisagree={handlerDisagree}
      />
    </>
  );
}

export default CreateArticleHeader;
