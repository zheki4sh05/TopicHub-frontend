import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleareUserData,
  controlResetError,
  getActiveUser,
  getUser,
  getUserError,
  getUserStatusLogout,
} from "../model/userSlice";
import { Controller, useForm } from "react-hook-form";
import { deleteUser, logoutUser, updateUserData } from "../api/requests";
import ConfirmModal from "../../../shared/ConfirmModal/ui/ConfirmModal";
import { useNavigate } from "react-router";
import { PathConstants } from "../../../app/pathConstants";
import Author from "../../../widgets/author/ui/Author";
import statusTypes from "../../../app/util/statusTypes";
import { logout } from "../../../features/Logout/api/request";
import { deleteTokens } from "../../../app/util/localstorageApi";
import { useTranslation } from "react-i18next";

function UserProfile({ edit }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = edit ? useSelector(getUser) : useSelector(getActiveUser);
  const error = useSelector(getUserError);
  const [show, setShow] = useState(false);
  const logoutStatus = useSelector(getUserStatusLogout);
  const { t } = useTranslation();
  const [message, setMessage] = useState(error ? error.message : "");
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      login: user.login,
      email: user.email,
    },
  });

  const handleClickLogout = () => {
    dispatch(logout());
    deleteTokens();
    navigate(PathConstants.LOGIN);
  };

  const onSubmit = (data) => {
    if (data.email.trim() == "" || data.login.trim() == "") {
      setMessage("Пустые поля");
    } else {
      dispatch(
        updateUserData({
          login: data.login,
          email: data.email,
          password: 111111,
        })
      );
      handleClickLogout();
    }
  };

  const handleClear = () => {
    dispatch(controlResetError());
    setMessage("");
    reset();
  };

  const handleDelAuthor = () => {
    dispatch(
      deleteUser({
        type: "author",
        id: user.id,
      })
    );
    dispatch(cleareUserData());
    navigate(PathConstants.ARTICLE);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (logoutStatus == statusTypes.succeeded) {
      window.location.href = PathConstants.HOME;
    }
  }, [logoutStatus]);

  return (
    <>
      <Stack direction={"column"}>
        <Stack direction={"row"}>
          <Stack direction={"row"}>
            <Author user={user} edit={edit} />

            <Stack direction={"column"}>
              {edit ? (
                <form
                  style={{
                    display: "flex",
                    width: "100%",
                    marginLeft: "20px",
                    flexDirection: "column",
                  }}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Controller
                    name="login"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        sx={{ marginBottom: "10px" }}
                        id="login"
                        type="login"
                        name="login"
                        label={t("message_login")}
                        variant="outlined"
                      />
                    )}
                  />

                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        sx={{ marginBottom: "10px" }}
                        id="email"
                        type="email"
                        name="email"
                        label={t("message_email")}
                        variant="outlined"
                      />
                    )}
                  />

                  <Box sx={{ height: "20px" }}>
                    <Typography variant="caption" sx={{ color: "red" }}>
                      {message}
                    </Typography>
                  </Box>
                  <Stack direction={"row"}>
                    <Button
                      sx={{
                        width: "100%",
                        marginTop: "20px",
                        marginRight: "10px",
                      }}
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={handleClear}
                    >
                      {t("btn_undo")}
                    </Button>
                    <Button
                      sx={{ width: "100%", marginTop: "20px" }}
                      size="small"
                      variant="contained"
                      type="submit"
                    >
                      {t("btn_save")}
                    </Button>
                  </Stack>
                </form>
              ) : (
                <>
                  <Typography sx={{ marginLeft: "15px" }} variant="subtitle1">
                    {user.login}
                  </Typography>
                  <Typography sx={{ marginLeft: "15px" }} variant="subtitle1">
                    {user.email}
                  </Typography>
                </>
              )}
            </Stack>
            {edit ? (
              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Box>
                  {!user.roles.includes(statusTypes.admin) ? 
                   <Button
                   color="error"
                   onClick={() => setShow(true)}
                   sx={{ marginLeft: "80px" }}
                 >
                   {t("btn_del_acc")}
                 </Button>
                 :
                 null
                
                }
                 
                  <Button
                    color="error"
                    onClick={handleLogout}
                    sx={{ marginLeft: "80px" }}
                  >
                    {t("logout")}
                  </Button>
                </Box>
              </Box>
            ) : null}
          </Stack>
        </Stack>
      </Stack>

      <ConfirmModal
        show={show}
        data={user}
        title={t('modal_title_4')}
        body={t('modal_body_4')}
        handlerAgree={handleDelAuthor}
        handlerDisagree={() => setShow(false)}
      />
    </>
  );
}

export default UserProfile;
