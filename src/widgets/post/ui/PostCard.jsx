import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import { PathConstants } from "../../../app/pathConstants";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

function PostCard({ image, handleShow }) {
     const { t } = useTranslation();
  const handleNavigate = () => {
    handleShow(image.targetId);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} src={""} title={image.filename} />
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          {image.filename}
        </Typography>
        <Stack direction="row">
          <Typography
            variant="subtitle1"
            sx={{ color: "text.secondary", marginRight: "5px" }}
          >
            {image.uploadDate}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "text.secondary", marginRight: "5px" }}
          >
            {image.contentType}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
            {image.imageSize}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" onClick={handleNavigate}>
          {t("btn_read_more")}
        </Button>
      </CardActions>
    </Card>
  );
}

export default PostCard;
