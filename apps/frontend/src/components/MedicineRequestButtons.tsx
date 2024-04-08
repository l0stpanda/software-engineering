import React from "react";
import { Button } from "@mui/material";

import { MedicineDelivery } from "../common/MedicineDelivery.tsx";

type requestButtonProps = {
  delivery: MedicineDelivery;
  // eslint-disable-next-line @typescript-eslint/ban-types
  clear: Function;
  submit: (delivery: MedicineDelivery) => void;
};
function RequestButtons(props: requestButtonProps) {
  function handleSubmit() {
    console.log(props.delivery);
    if (
      props.delivery.employeeName == "" ||
      props.delivery.location == "" ||
      props.delivery.medicineName == ""
    ) {
      alert(
        "employeeName, location, and medicineName Form must all be filled out",
      );
      return;
    }
    props.submit(props.delivery);
    props.clear();
  }

  function handleClear() {
    console.log("clear");
    props.clear();
  }

  return (
    <div className={"requestButtonsDiv"}>
      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{ borderRadius: "30px" }}
        onClick={handleSubmit}
      >
        SUBMIT
      </Button>
      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{ borderRadius: "30px" }}
        onClick={handleClear}
      >
        Clear
      </Button>
    </div>
  );
}
export default RequestButtons;
