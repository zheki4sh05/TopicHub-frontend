import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Box, Button, Skeleton, Snackbar, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { getToken } from "../../../pages/Profile/model/userSlice";
import getRequestImageConfig from "../../../app/util/requestImageConfig";
import axios from "axios";
import { useTranslation } from "react-i18next";

function ImageUpload({
  title,
  alt,
  size,
  urlGet,
  urlPost,
  handleLoadData,
  params = null,
}) {
  const [imageData, setImageData] = useState(null);
  const { t } = useTranslation();
  const [input, setInput] = useState(false);
 const [open, setOpen] = useState({ state: false, message: "" });
  const token = useSelector(getToken);
  const handleGetImage = async () => {
    try {
      const response = await axios.get(urlGet, getRequestImageConfig());

      const imageBlob = new Blob([response.data], { type: "image/*" });
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImageData(imageObjectURL);
    } catch (error) {}
  };

  useEffect(() => {
    if (urlGet != null) {
      handleGetImage();
    }
  }, []);

  const handleLoadImage = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", imageData);
    if (params != null) {
      Object.keys(params).forEach((key) => {
        formData.append(key, params[key]);
      });
    }
    try {
      const response = await axios.post(
        urlPost,
        formData,
        getRequestImageConfig(token)
      );
      handleLoadData(new TextDecoder().decode(response.data));
      return response.data;
    } catch (error) {
     
   
    setOpen({
        state: true,
        message: t('message_load_error'),
        type: "error",
      });
    }
  };

  const handleFileChange = (event) => {
    setInput(true);
    const file = event.target.files[0];
    if (file) {
      setImageData(file);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen({ state: false, message: "", type: "" });
    // dispatch(clearUserError())
  };

  return (
    <>
    
    <Box sx={{ marginLeft: "20px" }}>
      <form onSubmit={handleLoadImage}>
        <div>
       
            <Button>
            <label htmlFor="files">
            {t("chooseFile")}
          </label>
            </Button>
         
    
          
          <input
          id="files"
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
            style={{display:"none"}}
          />
        </div>
        {/* <div>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
            tex
          />
          <label></label>
        </div> */}

        {input ? (
          <Button size="small" type="submit">
            {title}
          </Button>
        ) : null}
      </form>
    </Box>
    
       <Snackbar open={open.state} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={open.type}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {open.message}
            </Alert>
          </Snackbar>
    </>
    
  );
}

export default ImageUpload;
