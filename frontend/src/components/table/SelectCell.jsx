/* eslint-disable react/prop-types */
import { useState } from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const SelectCell = ({ settings, options = [], patchUser, dialog }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const name = settings.getValue() || {};
  const handleUpdate = async (status) => {
    try {
      await patchUser({
        id: settings.row.original.id,
        [settings.column.id]: status._id,
      }).unwrap();

      dialog.setDialogType("success");
      dialog.setDialogMessage(
        `${settings.column.columnDef.header} successfully updated.`
      );
      dialog.setDialogWidth("xs");
      dialog.setOnConfirm(false);
    } catch (error) {
      let msg = error?.data?.message[0].msg
        ? error?.data?.message[0].msg
        : error?.data?.message
        ? error?.data?.message
        : "Unable to update. Please try again.";

      dialog.setDialogType("error");
      dialog.setDialogMessage(msg);
      dialog.setDialogWidth("xs");
      dialog.setOnConfirm(false);
    }
  };

  return (
    <>
      <div>
        <a
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className="text-blue-500 cursor-pointer"
        >
          {name.charAt(0).toUpperCase() + name.slice(1) || "N/A"}
        </a>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {options.map((status) => (
            <MenuItem
              key={status._id}
              tabIndex={0}
              role="button"
              onClick={(e) => {
                e.preventDefault();

                if (name === status.name) {
                  return;
                }

                dialog.openDialog(
                  "warning",
                  `Are you sure you want to update this ${settings.column.columnDef.header}?`,
                  () => handleUpdate(status)
                );
                handleClose();
              }}
              className="cursor-pointer"
            >
              <a>
                {status.name.charAt(0).toUpperCase() + status.name.slice(1)}
              </a>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </>
  );
};

export default SelectCell;
