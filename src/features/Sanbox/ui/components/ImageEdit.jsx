import { Box, Grid2, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import { delItem, getSandboxId, saveItem } from "../../model/sandboxSlice";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmModal from "../../../../shared/ConfirmModal/ui/ConfirmModal";
import { useTranslation } from "react-i18next";
import { createArticlepart, deleteArticlePart } from "../../api/requests";
function ImageEdit({ item }) {
  const dispatch = useDispatch();
  const [save, setSave] = useState(item.value.length>0);
  const id = useSelector(getSandboxId)
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(item.value);
  const { t } = useTranslation();
  const handleSave = () => {
    const part = { ...item, value: state, articleId:id }
  
       
       // dispatch(saveItem(part));
       setSave(true);
       dispatch(createArticlepart(part))
  };
  const handleEdit = () => {
    setSave(false);
  };

  const onChange = (event) => {
    setState(event.target.value);
  };

  const handleDelete = () => {
    if (state.trim().length != 0) {
      setOpen(true);
    } else {
      handlerAgree();
    }
  };

  const handlerAgree = () => {
    // dispatch(delItem({ created: item.created }));
     dispatch(deleteArticlePart({
          articleId:id,
          partId:item.uuid
        }))
  };
  const handlerDisagree = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid2 container sx={{ width: "100%", margin: "5px 0" }}>
        <Grid2 size={1}>
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            {save ? (
              <IconButton onClick={handleEdit}>
                <EditIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={handleSave}
                disabled={state.trim().length == 0}
              >
                <SaveIcon />
              </IconButton>
            )}
          </Box>
        </Grid2>
        <Grid2 size={10}>
          {save ? (
            <>
              <img src={state} alt={t("alt_error")} />
              <Typography variant="body2" gutterBottom sx={{ width: "100%" }}>
                {state}
              </Typography>
            </>
          ) : (
            <TextField
              id="standard-multiline-static"
              label={t("input_il")}
              multiline
              defaultValue="URL"
              variant="standard"
              value={state}
              sx={{ width: "100%" }}
              onChange={onChange}
            />
          )}
        </Grid2>
        <Grid2 size={1}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              marginLeft: "10px",
            }}
          >
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Grid2>
      </Grid2>
      <ConfirmModal
        show={open}
        title={t("modal_title_2")}
        body={t("modal_body_2")}
        data={item}
        handlerAgree={handlerAgree}
        handlerDisagree={handlerDisagree}
      />
    </>
  );
}

export default ImageEdit;
