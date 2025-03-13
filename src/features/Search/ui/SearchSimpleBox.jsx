import { IconButton, Paper, TextField } from "@mui/material";
import  SearchIcon  from '@mui/icons-material/Search';
import { useDispatch, useSelector } from "react-redux";
import { getSearchImageOptions, getSearchOptions, getSearchState, setImageSearchOptions, setSearchOptions } from "../model/searchSlice";
import { getUser, isAuth } from "../../../pages/Profile/model/userSlice";
import { searchImageRequest } from "../api/request";

function SearchSimpleBox() {
    const dispatch = useDispatch()
    const image = useSelector(getSearchImageOptions);
    
  const handleSearch = (event) => {
    event.preventDefault()
    console.log(image)
    dispatch(searchImageRequest({...image}));   
  };
    return ( 

        <Paper
        component="form"
        elevation={1}
        sx={{
          display: "flex",
          alignItems: "center",
          width: 350,
          bgcolor: "white",
          border: "#DCDCDC solid 2px",
          borderRadius: "10px",
        }}
        onSubmit={handleSearch}
      >

        <TextField
          id="input"
          name="input"
          sx={{ flex: 1 }}
          siz="small"
          variant="standard"
          value={image.name}
          onChange={(event) => dispatch(setImageSearchOptions({...image, name:event.target.value }))}
        />
        <IconButton type="submit"  sx={{ p: "5px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

     );
}

export default SearchSimpleBox;