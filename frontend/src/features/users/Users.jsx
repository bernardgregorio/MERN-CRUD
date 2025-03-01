/* eslint-disable react/prop-types */
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import Tanstack from "../../components/table/Tanstack";
import InputCell from "../../components/table/InputCell";
import SelectCell from "../../components/table/SelectCell";
import DateCell from "../../components/table/DateCell";

import CustomDialog from "../../components/dialog/CustomDialog";
import {
  useFetchUsersQuery,
  useLazyFetchUserByIdQuery,
  useDeleteUserMutation,
  usePatchUserMutation,
  useCreateUserMutation,
} from "./userApiSlice";
import { useFetchStatusQuery } from "../status/statusApiSlice";
import UserForm from "./UserForm";

const Users = () => {
  const {
    data: users,
    isSuccess,
    isError,
    error,
    isLoading,
  } = useFetchUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [patchUser] = usePatchUserMutation();
  const [createUser] = useCreateUserMutation();

  const [selectedUser, setSelectedUser] = useState(null);
  const [fetchUserById] = useLazyFetchUserByIdQuery();

  const {
    data: status,
    isSuccess: isStatusSuccess,
    isError: isStatusError,
  } = useFetchStatusQuery();

  const [userFormType, setUserFormType] = useState("update");

  /** dialog start */
  const [open, setOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("warning");
  const [dialogWidth, setDialogWidth] = useState("xs");
  const [onConfirm, setOnConfirm] = useState(null);

  const openDialog = (type, msg, Confirm) => {
    setDialogType(type);
    setDialogMessage(msg);
    setOnConfirm(() => Confirm);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const dialogProps = {
    openDialog,
    setDialogType,
    setDialogMessage,
    setDialogWidth,
    setOnConfirm,
  };

  /** dialog end */

  /** user form dialog start */
  const [openUserForm, setOpenUserForm] = useState(false);

  const closeUserDialog = () => {
    setOpenUserForm(false);
  };

  /** user form dialog end */

  /**handle delete per user id */
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setDialogType("success");
      setDialogMessage("User successfully deleted.");
      setOnConfirm(false);
    } catch {
      setDialogType("error");
      setDialogMessage("Unable to delete user. Please try again.");
      setOnConfirm(false);
    }
  };

  /** handle fetch user by id */
  const handleFetchUser = async (userId) => {
    try {
      const userData = await fetchUserById(userId).unwrap(); // Wait for API response
      setSelectedUser(userData);
      setOpenUserForm(true);
    } catch {
      setDialogType("error");
      setDialogMessage("Unable to get the user data.");
      setOnConfirm(false);
    }
  };

  const handleCreateUser = () => {
    setSelectedUser([]);
    setOpenUserForm(true);
    setUserFormType("create");
  };

  const columns = [
    {
      accessorKey: "username",
      header: "Username",
      footer: "Username",
      cell: (props) => (
        <InputCell
          settings={props}
          getValue={props.getValue()}
          patchUser={patchUser}
          dialog={dialogProps}
        />
      ),
    },
    {
      accessorKey: "email",
      header: "Email Address",
      footer: "Email Address",
      cell: (props) => (
        <InputCell
          settings={props}
          getValue={props.getValue()}
          patchUser={patchUser}
          dialog={dialogProps}
        />
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      footer: "Status",
      cell: (props) => (
        <div className="text-center">
          <SelectCell
            settings={props}
            options={isStatusError ? [] : status}
            patchUser={patchUser}
            dialog={dialogProps}
          />
        </div>
      ),
    },
    {
      accessorKey: "expirationDate",
      header: "Expiration Date",
      footer: "Expiration Date",
      cell: (props) => (
        <div className="text-center">
          <DateCell
            settings={props}
            options={isStatusError ? [] : status}
            patchUser={patchUser}
            dialog={dialogProps}
          />
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: "Actions",
      footer: "Actions",
      cell: (props) => (
        <div className="text-center">
          <Tooltip title="Edit">
            <IconButton
              variant="contained"
              aria-label="update"
              color="primary"
              size="large"
              onClick={(e) => {
                e.preventDefault();
                setUserFormType("update");
                handleFetchUser(props.row.original.id);
              }}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              color="error"
              size="large"
              onClick={(e) => {
                e.preventDefault();
                setDialogWidth("xs");
                openDialog(
                  "warning",
                  "Are you sure you want to delete this user?",
                  () => handleDelete(props.row.original.id)
                );
              }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </div>
      ),
      enableSorting: false,
    },
  ];

  let customBtn = (
    <Button
      variant="contained"
      color="primary"
      onClick={(e) => {
        e.preventDefault();
        handleCreateUser();
      }}
      startIcon={<PersonAddIcon />}
    >
      Create User
    </Button>
  );

  let content;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <div>Error: {error}</div>;
  } else if (isSuccess && isStatusSuccess) {
    content = (
      <>
        <Tanstack data={users} columns={columns} customBtn={customBtn} />
        <CustomDialog
          open={open}
          closeDialog={closeDialog}
          handleConfirm={onConfirm}
          message={dialogMessage}
          type={dialogType}
          dWidth={dialogWidth}
        />
        {selectedUser && (
          <UserForm
            user={selectedUser}
            open={openUserForm}
            closeDialog={closeUserDialog}
            dialog={dialogProps}
            options={status}
            action={userFormType == "update" ? patchUser : createUser}
            type={userFormType}
          />
        )}
      </>
    );
  }

  return <>{content}</>;
};

export default Users;
