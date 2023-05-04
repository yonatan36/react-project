import React, { useState, Fragment, useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PhoneIcon from "@mui/icons-material/Phone";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
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

const CardComponent = ({
  img,
  title,
  subTitle,
  phone,
  address,
  description,
  email,
  createdAt,
  likes,
  id,
  onDelete,
  onEdit,
  onDeletefav,
  canEdit,
  notConnected,
  isFav,
}) => {
  const [showphone, setShowPhone] = useState(false);
  const [open, setOpen] = useState(false);
  const [favState, setfavState] = useState(isFav);

  const handleLikeBtnClick = async () => {
    try {
      await axios.patch("/cards/card-like/" + id);
      setfavState((prevState) => !prevState);
      onDeletefav(id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteBtnClick = () => {
    onDelete(id);
  };

  const handleEditBtnClick = () => {
    onEdit(id);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handlephoneBtnopen = () => {
    const newPhone = !showphone;
    setShowPhone(newPhone);
  };
  const cardRef = useRef(null);

  const handleClick = () => {
    const cardNode = cardRef.current;
    console.log(cardNode);
    // do something with cardNode
  };

  return (
    <Card square raised ref={cardRef} onClick={handleClick}>
      <CardActionArea onClick={handleOpen}>
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

        <CardHeader title={title} subheader={subTitle}></CardHeader>
        <Divider />
        <CardContent>
          <Typography>{`phone: ${phone}`}</Typography>
          <Typography>{`Address: ${address}`}</Typography>
          <Typography>{`Likes: ${likes.length}`}</Typography>
          <Typography>{`Card Number: ${id}`}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {canEdit ? (
          <Fragment>
            <Button variant="text" color="error" onClick={handleDeleteBtnClick}>
              <DeleteIcon />
            </Button>
            <Button variant="text" color="warning" onClick={handleEditBtnClick}>
              <EditIcon />
            </Button>
          </Fragment>
        ) : (
          ""
        )}
        {notConnected ? (
          ""
        ) : (
          <Button color="primary" onClick={handleLikeBtnClick}>
            <FavoriteIcon
              className="fav"
              sx={favState ? { color: "red" } : { color: "primary" }}
            />
          </Button>
        )}

        <Button variant="text" color="success" onClick={handlephoneBtnopen}>
          <PhoneIcon />
          {showphone && phone}
        </Button>
      </CardActions>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Card square raised>
            <DialogTitle>{title}</DialogTitle>
            <CardMedia component="img" image={img} />
            <Divider />
            <DialogTitle>{subTitle}</DialogTitle>
            <DialogContent>{description}</DialogContent>
            <Divider />
            <DialogContent>
              <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
                <b style={{ color: "#2196f3" }}>Address:</b> {address}
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
                <b style={{ color: "#2196f3" }}>Phone:</b> {phone}
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
                <b style={{ color: "#2196f3" }}>Email:</b> {email}
              </Typography>
              <Typography variant="subtitle1">
                <b style={{ color: "#2196f3" }}>Created At:</b> {createdAt}
              </Typography>
              <Typography variant="subtitle1">
                <b style={{ color: "#2196f3" }}>likes:</b> {likes.length}
              </Typography>
            </DialogContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

CardComponent.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  email: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onDeletefav: PropTypes.func,
  onEdit: PropTypes.func,
  canEdit: PropTypes.bool,
  notConnected: PropTypes.bool,
  isFav: PropTypes.bool,
};

CardComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  subTitle: "",
};

export default CardComponent;
