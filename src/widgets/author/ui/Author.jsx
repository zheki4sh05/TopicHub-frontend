import { Box, Skeleton, Typography } from "@mui/material";
import api from "../../../app/util/apiPath";
import { useNavigate } from "react-router";
import { PathConstants } from "../../../app/pathConstants";
import { useDispatch } from "react-redux";
import {
  setActiveUser,
  setLogoId,
} from "../../../pages/Profile/model/userSlice";
import Img from "../../../shared/Img/ui/Img";
import ImageUpload from "../../../shared/ImageUpload/ui/ImageUpload";
import defaultIcon from "../../../app/img/default.png";
function Author({ user, edit = false, size = 100 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setUser = (event) => {
    dispatch(setActiveUser(user));
    navigate(PathConstants.PROFILE);
  };

  const handleSaveLogoId = (image) => {
    dispatch(setLogoId(JSON.parse(image)));
  };
  return (
    <>
      <Box onClick={setUser}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
          }}
        >
          {
            <Box
              style={{
                width: size + "px",
                height: size + "px",
                objectFit: "cover",
                borderRadius: "100%",
                overflow: "hidden",
              }}
            >
              {user.logoId && user.logoId.length != 0 ? (
                <Img id={user.logoId} fileName={"Аватар"} />
              ) : (
                <img src={defaultIcon} style={{width:"100%"}}/>
              )}
            </Box>
          }

          <Typography variant="h6" sx={{ textDecoration: "underline" }}>
            {user.login}
          </Typography>
        </Box>
      </Box>

      {edit ? (
        <Box sx={{ marginLeft: "20px" }}>
          <ImageUpload
            title="Изменить аватар"
            urlPost={api.profile.url.concat(api.profile.logo)}
            handleLoadData={handleSaveLogoId}
          />
        </Box>
      ) : null}
    </>
  );
}

export default Author;
