/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUser, createUser } from "../validations/user";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const UserForm = ({
  user,
  open,
  closeDialog,
  dialog,
  options,
  type = "update",
  action,
}) => {
  const [statusState, setStatusState] = useState("67beaaffebab9c1b684fd3d4");

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(type == "update" ? updateUser : createUser),
  });

  useEffect(() => {
    reset({
      username: user?.username || "",
      email: user?.email || "",
      expirationDate: user?.expirationDate
        ? dayjs(user.expirationDate).format("YYYY-MM-DD")
        : dayjs().format("YYYY-MM-DD"),
      status: user?.status?._id || "",
    });
    setStatusState(user?.status?._id || "67beaaffebab9c1b684fd3d4");
  }, [user, reset]);

  const onSubmit = (data) => {
    dialog.openDialog(
      "warning",
      `Are you sure you want to update this user data?`,
      () => process(data)
    );
  };

  const handleSelectChange = (event) => {
    setStatusState(event.target.value);
    setValue("status", event.target.value);
  };

  const process = async (data) => {
    /** remove null value */
    let filteredData = Object.fromEntries(
      // eslint-disable-next-line no-unused-vars
      Object.entries(data).filter(([_, v]) => v != null)
    );

    try {
      if (type === "create") {
        await action({ ...filteredData }).unwrap();
        dialog.setDialogType("success");
        dialog.setDialogMessage("User added successfully.");
        dialog.setDialogWidth("xs");
        dialog.setOnConfirm(false);
        reset();
        return;
      } else {
        filteredData = {
          ...filteredData,
          expirationDate: dayjs(filteredData.expirationDate).format(
            "YYYY-MM-DD"
          ),
        };

        await action({ id: user._id, ...filteredData }).unwrap();
        dialog.setDialogType("success");
        dialog.setDialogMessage("User data successfully updated.");
        dialog.setDialogWidth("xs");
        dialog.setOnConfirm(false);
      }
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
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={open}
        onClose={closeDialog}
        id="user-form"
        className="font-roboto"
      >
        <DialogTitle id="alert-dialog-title">
          {type === "create" ? "Create User" : "Update User"}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {type === "update" && (
              <Alert severity="info" className="mb-6">
                Leave password blank if you don&apos;t want to change it.
              </Alert>
            )}

            {Object.keys(errors).length > 0 && (
              <Alert severity="error" className="mb-6">
                {Object.values(errors).map((error, index) => (
                  <div key={index}>{error.message}</div>
                ))}
              </Alert>
            )}
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Username"
                  placeholder="Enter username"
                  variant="outlined"
                  type="text"
                  margin="dense"
                  autoFocus
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  {...register("username")}
                  error={!!errors?.username}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Password"
                  placeholder="Enter password"
                  variant="outlined"
                  type="password"
                  margin="dense"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  {...register("password")}
                  error={!!errors?.password}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  placeholder="Confirm password"
                  variant="outlined"
                  type="password"
                  margin="dense"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  {...register("confirmPassword")}
                  error={!!errors?.confirmPassword}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  placeholder="Enter email address"
                  variant="outlined"
                  type="email"
                  margin="dense"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  {...register("email")}
                  error={!!errors?.email}
                />
              </Grid>
              <Grid size={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="expirationDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="Expiration Date"
                        format="YYYY-MM-DD"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) => {
                          const formattedDate =
                            dayjs(date).format("YYYY-MM-DD");
                          field.onChange(formattedDate);
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!errors?.expirationDate,
                          },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid size={6}>
                <FormControl fullWidth>
                  <InputLabel id="status">Status</InputLabel>
                  <Select
                    labelId="status"
                    label="Status"
                    {...register("status")}
                    error={!!errors?.status}
                    value={statusState}
                    onChange={handleSelectChange}
                  >
                    {options.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained">
              Save
            </Button>

            <Button onClick={closeDialog} variant="contained">
              Close
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default UserForm;
