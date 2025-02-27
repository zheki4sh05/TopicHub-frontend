import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

function PostCard({ image, handleShow }) {
     const { t } = useTranslation();
  const handleNavigate = () => {
    handleShow(image.targetId);
  }
  return (
    <Card sx={{ maxWidth: 345,marginBottom: "10px", marginLeft:"10px" }}>
      <Box sx={{ height: 160, overflow:"hidden", objectFit:"cover" }}>
        <img style={{width:"100%", height:"100%"}} src={`http://localhost:8080/api/v1/image?id=${image.id}`} alt={image.filename} />
        </Box>
    
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
