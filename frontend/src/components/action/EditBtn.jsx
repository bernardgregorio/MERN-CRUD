import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";

const EditBtn = ({ onClick }) => {
  return (
    <Avatar
      sx={{
        width: 34,
        height: 34,
        bgcolor: "success.main",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Tooltip title="Edit">
        <EditIcon sx={{ fontSize: 20 }} />
      </Tooltip>
    </Avatar>
  );
};

export default EditBtn;

EditBtn.propTypes = {
  onClick: PropTypes.func,
};
