import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import SelectHub from "../../hubs/ui/SelectHub";
import { useDispatch, useSelector } from "react-redux";
import { getTheme, saveTheme, setHub } from "../../../features/Sanbox/model/sandboxSlice";
import { getUser } from "../../../pages/Profile/model/userSlice";
import { useTranslation } from "react-i18next";

function ArticleTheme() {

  const theme = useSelector(getTheme);
  const dispatch = useDispatch()
  const user  = useSelector(getUser)
  const {t} = useTranslation()
  const handleHubChange = (value) => {
    dispatch(setHub(value))
  };

  const handleThemeChange=(data)=>{
    dispatch(saveTheme(data))
  }


  return (
    <Box sx={{ display: "flex", flexDirection: "column",width:"100%"}}>
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          {user.login}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          id="standard-basic"
          label={t('enter_theme_name')}
          variant="standard"
          value={theme}
          onChange={(event) =>handleThemeChange(event.target.value)}
        />
        <SelectHub titleSelect={t('select_hub')}  handleChange={handleHubChange} />
      </Box>
   
    </Box>
  );
}

export default ArticleTheme;
