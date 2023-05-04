import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

function CardDeleteDialog(props) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { onConfirm } = props;



  const handleDeleteCard = () => {
    onConfirm();
    setIsDeleteDialogOpen(false);
  };

  const handleClose = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <Dialog open={isDeleteDialogOpen} onClose={handleClose}>
      <DialogTitle>Are you sure you want to delete this card?</DialogTitle>
      <DialogContent>
        Deleting a card is permanent and cannot be undone.
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDeleteCard} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CardDeleteDialog;
