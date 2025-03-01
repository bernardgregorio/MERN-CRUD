/* eslint-disable react/prop-types */
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const DateCell = ({ settings, patchUser, dialog }) => {
  const date = dayjs(settings.getValue());

  /** handle update */
  const handleUpdate = async (date) => {
    try {
      const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;
      await patchUser({
        id: settings.row.original.id,
        [settings.column.id]: formattedDate,
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          defaultValue={date}
          format="YYYY-MM-DD"
          onChange={(newDate) => {
            dialog.openDialog(
              "warning",
              `Are you sure you want to update this ${settings.column.id}?`,
              () => handleUpdate(newDate)
            );
          }}
          slotProps={{
            textField: {
              sx: {
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              },
            },
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default DateCell;
