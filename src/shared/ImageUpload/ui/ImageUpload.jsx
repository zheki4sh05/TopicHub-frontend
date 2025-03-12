import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Skeleton, Typography } from "@mui/material";
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
      console.log(error);
    }
  };

  const handleFileChange = (event) => {
    setInput(true);
    const file = event.target.files[0];
    if (file) {
      setImageData(file);
    }
  };

  return (
    <Box sx={{ marginLeft: "20px" }}>
      <form onSubmit={handleLoadImage}>
        <div>
       
            <Button>
            <label for="files">
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
  );
}

export default ImageUpload;
