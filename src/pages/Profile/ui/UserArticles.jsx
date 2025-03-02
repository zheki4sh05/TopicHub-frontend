import {
  Box,
  LinearProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import MenuWrapper from "../../../widgets/menu/ui/MenuWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getActiveUser,
  getUser,
  isAuth,
} from "../model/userSlice";
import ArticlesList from "../../../widgets/articlesList/ui/ArticlesList";
import { fetchAuthorArticles, fetchUserArticles } from "./../api/requests";
import statusTypes from "../../../app/util/statusTypes";
import { getFeed, getFeedStatus } from "../../Article/model/feedSlice";
import { useTranslation } from "react-i18next";
import SelectArticleStatus from "../../../features/ArticleSelect/ui/SelectArticleStatus";

function UserArticles({ edit }) {
  const articles = useSelector(getFeed);
  const dispatch = useDispatch();
  const status = useSelector(getFeedStatus);
  const user = useSelector(getActiveUser);
  const currentUser = useSelector(getUser);
  const auth = useSelector(isAuth);
  const {t} = useTranslation()
  const [statusArticle, setArticleStatus] = useState(statusTypes.publish)
  const makeRequest = (page,status) => {
    if (edit) {
      dispatch(
        fetchUserArticles({
          page: page,
          type: "articles",
          status:status
        })
      );
    } else {
      const body = auth
        ? {
            page: page,
            type: "author",
            otherUserId: user.id,
            userId: auth ? currentUser.id : null,
          }
        : { page: page, type: "author", otherUserId: user.id };

      dispatch(fetchAuthorArticles(body));
    }
  };

  const handlePageChange = (event, page) => {
    makeRequest(page, statusArticle);
  };

  useEffect(() => {
    makeRequest(1, statusTypes.publish);
  }, []);

  const reload=()=>{
    makeRequest(1,statusArticle)
  }

  const changeArticleStatus=(value)=>{
    setArticleStatus(value)
    makeRequest(1,value)
  }

  const getEmptyMsg=(status)=>{

    let msg;
      switch(status){
        case statusTypes.moderation:{
          msg =t('txt_warning_articles_mod')
          break;
        }
        case statusTypes.publish:{
            msg =t('txt_warning_articles')
            break;
        }
        case statusTypes.edit:{
          msg =t('txt_warning_articles_edit')
          break;
        }
        default:{
          msg =t('txt_warning_articles')
          break;
        }
      }
      return (
        <Typography>
           {msg}
          </Typography>
      )
  }

  return (
    <>
    <SelectArticleStatus
    
    handleChangeValue={changeArticleStatus}
          />
      {articles.items.length > 0 ? (
        <Stack direction={"column"}>
          
          <ArticlesList
            status={status}
            batch={articles}
            makeRequest={reload}
            edit={true}
          />

          <MenuWrapper>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                count={
                  Object.keys(articles).length != 0 ? articles.pageCount : 0
                }
                variant="outlined"
                color="primary"
                onChange={handlePageChange}
              />
            </Box>
          </MenuWrapper>
        </Stack>
      ) : status == statusTypes.loading ? (
        <LinearProgress />
      ) : 
      // (
      //   <>
      //     {
            
      //     }
      //     <Typography>
      //      {t('txt_warning_articles')}
      //     </Typography>
      //   </>
      // )
      getEmptyMsg(statusArticle)
      
      }
    </>
  );
}

export default UserArticles;
