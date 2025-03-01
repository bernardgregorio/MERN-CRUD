/* eslint-disable react/prop-types */
import { useState } from "react";

const InputCell = ({ settings, getValue, patchUser, dialog }) => {
  const [value, setValue] = useState(getValue);

  const handleUpdate = async () => {
    try {
      await patchUser({
        id: settings.row.original.id,
        [settings.column.id]: value,
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
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();

            if (value === getValue) {
              return;
            }

            dialog.openDialog(
              "warning",
              `Are you sure you want to update this ${settings.column.columnDef.header}?`,
              () => handleUpdate()
            );
          }
        }}
        className="w-full p-2 rounded-md border-none focus:bg-white"
      />
    </>
  );
};

export default InputCell;
