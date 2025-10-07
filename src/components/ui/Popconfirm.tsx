import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Children,
  cloneElement,
  isValidElement,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useState,
} from "react";

type Props = {
  title: string;
  description: string;
  onConfirm: () => void;
  okText?: string;
  cancelText?: string;
  children: ReactNode;
};

type ChildWithOnClick = ReactElement<{ onClick?: MouseEventHandler }>;

export const Popconfirm = ({
  children,
  title,
  description,
  onConfirm,
  okText = "Ok",
  cancelText = "Cancel",
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOk = () => {
    onConfirm();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modifiedChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    return cloneElement(child as ChildWithOnClick, {
      onClick: handleClickOpen,
    });
  });

  return (
    <>
      {modifiedChildren}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOk}>{okText}</Button>
          <Button onClick={handleClose}>{cancelText}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
