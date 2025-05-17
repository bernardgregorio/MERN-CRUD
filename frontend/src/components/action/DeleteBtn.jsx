import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteBtn = ({ onClick }) => {
  return (
    <Avatar
      sx={{
        width: 34,
        height: 34,
        bgcolor: "error.main",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Tooltip title="Delete">
        <DeleteIcon sx={{ fontSize: 20 }} />
      </Tooltip>
    </Avatar>
  );
};

export default DeleteBtn;

DeleteBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};
