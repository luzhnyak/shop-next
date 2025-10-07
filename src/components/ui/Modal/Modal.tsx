import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal as MuiModal } from "@mui/material";
import { ReactNode } from "react";
import css from "./Modal.module.css";

type Props = {
  children: ReactNode;
  isOpenModal: boolean;
  setOpenModal: (value: boolean) => void;
};

export const Modal = ({ children, isOpenModal, setOpenModal }: Props) => {
  return (
    <MuiModal
      open={isOpenModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={css.modalBox}>
        <IconButton
          aria-label="close"
          onClick={() => setOpenModal(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "gray",
          }}
        >
          <CloseIcon />
        </IconButton>
        {children}
      </Box>
    </MuiModal>
  );
};
