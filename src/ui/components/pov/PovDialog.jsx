import {
  Dialog,
  DialogContent,
  useTheme,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/CloseRounded";
import PovForm from "./PovForm";
import { useAccount } from "../../../hooks/useAccount";

export const PovDialog = ({ open, onClose, povToEdit = null }) => {
  const theme = useTheme();

  const { account, createPov, updatePov, loading } = useAccount();

  const handleSubmit = async (formData) => {
    let userData;
    if (povToEdit) {
      userData = {
        ...povToEdit,
        ...formData,
      };
    } else {
      userData = {
        ...formData,
        author: await account?.id,
      };
    }

    try {
      if (povToEdit) {
        await updatePov(povToEdit.id, userData);
      } else {
        await createPov(userData);
      }
      onClose();
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 4,
            bgcolor: "background.paper",
            border: "none",
            boxShadow: theme.shadows[10],
          },
        },
      }}
    >
      <Box sx={{ position: "absolute", right: 8, top: 8, zIndex: 11 }}>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: "text.secondary" }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        <PovForm
          pov={povToEdit ? { ...povToEdit } : null}
          onSubmit={handleSubmit}
          onCancel={onClose}
          loading={loading}
          showDraftStatus={false}
          title={povToEdit ? "Edit Perspective" : "New Perspective"}
        />
      </DialogContent>
    </Dialog>
  );
};
