import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  cleareSearch,
  getSearchImageOptions,
  getSearchImageResult,
  getSearchStatus,
} from "../../../features/Search/model/searchSlice";
import PostCard from "./../../../widgets/post/ui/PostCard";
import MenuWrapper from "../../../widgets/menu/ui/MenuWrapper";
import { findArticle } from "../../../features/Article/api/requests";
import { getFindStatus } from "../../../features/Article/model/articleSlice";
import { useEffect } from "react";
import statusTypes from "./../../../app/util/statusTypes";
import { useNavigate } from "react-router";
import { PathConstants } from "../../../app/pathConstants";
import SectionHeader from "../../../shared/SectionHeader/ui/SectionHeader";
import { useTranslation } from "react-i18next";
import { fetchImagesPage } from "../../../features/Search/api/request";

function Posts() {
  const pageResponse = useSelector(getSearchImageResult);
  const dispatch = useDispatch();
  const articleStatus = useSelector(getFindStatus);
  const navigate = useNavigate();
  const searchStatus = useSelector(getSearchStatus);
      const image = useSelector(getSearchImageOptions);
  const { t } = useTranslation();

  const handlePageChange = (event, page) => {
    dispatch(fetchImagesPage({
      page:page
    }));
  };

  const handleShow = (id) => {
    dispatch(findArticle({ articleId: id }));
  };

  useEffect(() => {
    if (articleStatus == statusTypes.succeeded) {
      navigate(PathConstants.VIEW);
    }
  }, [articleStatus]);
  const fetchImages=(page)=>{
    dispatch(fetchImagesPage({
      page:page
    }))
  }

  const handleReset = () => {
    dispatch(cleareSearch());
    fetchImages(1)
  };



  useEffect(()=>{
   
    fetchImages(1)
  },[])

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
        <SectionHeader>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleReset}
            disabled={image.name.length==0}
          >
            Сбросить
          </Button>
          {articleStatus==statusTypes.loading ??
            <CircularProgress/>
          }
          
        </SectionHeader>
        <Box sx={{ marginBottom: "5px" }}></Box>
        {pageResponse.items.length == 0 && searchStatus == statusTypes.idle ? (
          <Typography>
            Воспользуйтесь поиском изображений для нахождения нужной статьи
          </Typography>
        ) : (
          <>
            {searchStatus == statusTypes.loading ? (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            ) :
            searchStatus == statusTypes.failed ? 
            <Typography variant="subtitle1" gutterBottom sx={{ color: "red" }}>
            {t('txt_error_http')}
           </Typography>
            : (
              <>
                {pageResponse.items.length > 0 ? (
                  <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
                    {pageResponse.items.map((item) => (
                      <PostCard
                        image={item}
                        key={item.id}
                        handleShow={handleShow}
                      />
                    ))}
                  </Stack>
                ) : (
                  <Typography>По данному запросу ничего не найдено</Typography>
                )}

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
          </>
        )}
      </Box>
    </>
  );
}

export default Posts;
