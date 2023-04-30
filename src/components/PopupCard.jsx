import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

const PopupCard = ({
  img,
  title,
  subTitle,
  phone,
  address,
  description,
  email,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card>
        <CardActionArea onClick={handleOpen}>
          <CardHeader title={title} subheader={subTitle} />
          <CardMedia component="img" image={img} />
          <CardContent>
            <Typography>{description}</Typography>
            <DialogContent>{`Address: ${address}`}</DialogContent>
            <Typography>{`phone: ${phone}`}</Typography>
            <Typography>{`email: ${email}`}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Card>
            <CardHeader title={title} subheader={subTitle} />
            <CardMedia component="img" image={img} />
            <CardContent>
              <Typography>{description}</Typography>
              <DialogContent>{`Address: ${address}`}</DialogContent>
              <Typography>{`phone: ${phone}`}</Typography>
              <Typography>{`email: ${email}`}</Typography>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PopupCard;
