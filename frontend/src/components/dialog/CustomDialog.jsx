/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";

const CustomDialog = ({
  open,
  handleConfirm = false,
  closeDialog,
  message,
  type,
  dWidth = "xs",
}) => {
  const renderDialogTitle = (type) => {
    switch (type) {
      case "success":
        return (
          <Alert sx={{ padding: "10px 16px" }} severity="success">
            Success
          </Alert>
        );
      case "info":
        return (
          <Alert sx={{ padding: "10px 16px" }} severity="info">
            Information
          </Alert>
        );
      case "warning":
        return (
          <Alert sx={{ padding: "10px 16px" }} severity="warning">
            Warning
          </Alert>
        );
      case "error":
        return (
          <Alert sx={{ padding: "10px 16px" }} severity="error">
            Error
          </Alert>
        );
      default:
        return <p className="p-4">{type}</p>;
    }
  };

  const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 11);
  };
  const dialogId = generateRandomId();

  return (
    <Dialog
      fullWidth={true}
      maxWidth={dWidth}
      open={open}
      onClose={closeDialog}
      id={dialogId}
      className="font-roboto"
    >
      <DialogTitle id="alert-dialog-title" sx={{ padding: 0 }}>
        {renderDialogTitle(type)}
      </DialogTitle>
      <DialogContent>
        <div className="p-6">{message}</div>
      </DialogContent>
      <DialogActions>
        {handleConfirm && (
          <Button onClick={handleConfirm} variant="contained">
            {type.toLowerCase().includes("update") ||
            type.toLowerCase().includes("create")
              ? "Save"
              : "Yes"}
          </Button>
        )}

        <Button onClick={closeDialog} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
