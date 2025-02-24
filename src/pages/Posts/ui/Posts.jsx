import { Box, Pagination, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getSearchImageResult } from "../../../features/Search/model/searchSlice";
import PostCard from "./../../../widgets/post/ui/PostCard";
import MenuWrapper from "../../../widgets/menu/ui/MenuWrapper";
import { findArticle } from "../../../features/Article/api/requests";

function Posts() {
  const pageResponse = useSelector(getSearchImageResult);
  const dispatch = useDispatch();

  const handlePageChange = () => {
    dispatch();
  };

  const handleShow = (id) => {
    dispatch(findArticle(id));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {pageResponse.items.length == 0 ? (
          <Typography>
            Воспользуйтесь поиском изображений для нахождения нужной статьи
          </Typography>
        ) : (
          <>
            <Box sx={{ marginBottom: "20px" }}>
              {pageResponse.items.map((item) => (
                <PostCard image={item} key={item.id} handleShow={handleShow} />
              ))}
            </Box>

            <MenuWrapper>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Pagination
                  count={pageResponse.page == 0 ? 1 : pageResponse.page}
                  variant="outlined"
                  color="primary"
                  onChange={handlePageChange}
                />
              </Box>
            </MenuWrapper>
          </>
        )}
      </Box>
    </>
  );
}

export default Posts;
