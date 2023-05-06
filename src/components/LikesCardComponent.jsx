import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Divider,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { Fragment } from "react";

const LikesCardComponent = ({
  img,
  title,
  subTitle,
  phone,
  address,
  likes,
  bizNumber,
  id,
  onDelete,
  onEdit,
  noLike,
  canEdit,
  canDelete,
  notConnected,
}) => {
  const handleDeleteBtnClick = () => {
    onDelete(id);
  };
  const handleEditBtnClick = () => {
    onEdit(id);
  };
  const handleLikeBtnClick = () => {
    noLike(id);
    console.log("here");
  };
  return (
    <Card square raised>
      <CardActionArea>
        <CardMedia
          component="img"
          image={img}
          sx={{
            maxHeight: { xs: 233, md: 250 },
            maxWidth: { xs: 350, md: 380 },
            borderRadius: 4,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            marginBottom: 2,
            display: "cover",
          }}
        />
      </CardActionArea>
      <CardHeader title={title} subheader={subTitle}></CardHeader>
      <Divider />
      <CardContent>
        <Typography>{`phone: ${phone}`}</Typography>
        <Typography>{`Address: ${address}`}</Typography>
        <Typography>{`Card Number: ${bizNumber}`}</Typography>
        <Typography>{`Likes: ${likes.length}`}</Typography>
      </CardContent>
      <CardActions>
        {canEdit ? (
          <Fragment>
            <Button variant="text" color="error" onClick={handleDeleteBtnClick}>
              delete <DeleteIcon />
            </Button>
            <Button variant="text" color="warning" onClick={handleEditBtnClick}>
              edit <EditIcon />
            </Button>
          </Fragment>
        ) : (
          ""
        )}
        {notConnected ? (
          ""
        ) : (
          <Button variant="text" color="primary" onClick={handleLikeBtnClick}>
            <FavoriteIcon />
          </Button>
        )}
        <Button variant="text" color="success">
          <PhoneIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LikesCardComponent.propTypes = {
  id: PropTypes.string,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  canEdit: PropTypes.bool,
};
LikesCardComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  subTitle: "",
};

export default LikesCardComponent;
