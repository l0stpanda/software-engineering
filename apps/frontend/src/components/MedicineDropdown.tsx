import { Autocomplete, FormControl, TextField } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";
type inventoryDrop = {
  room: string;
  update: (a: string) => void;
  label: string;
  className?: string;
};

export default function MedicineDropdown(prop: inventoryDrop) {
  const [items, setItem] = useState<string[]>([]);
  useEffect(() => {
    handleDropDown().then();
  }, []);

  async function handleDropDown() {
    const res: AxiosResponse<{ name: string; type: string }[]> =
      await axios.get<{ name: string; type: string }[]>("api/inventory");
    const arr: string[] = [];
    // console.log(res.data.length);
    for (let i = 0; res.data.length > i; i++) {
      console.log("here");
      if (res.data[i].type == "medicine") {
        arr.push(res.data[i].name);
      }
    }

    console.log("THIS IS THE ARRAY: " + arr);
    setItem(arr);
  }

  //Separate for the dropdown changes
  function handleDropdown(
    e: SyntheticEvent<Element, Event>,
    value: string | null,
  ) {
    if (value) {
      //value = value.replace("{label: '", "");
      console.log(value);
      prop.update(value);
    }
  }

  return (
    <div className={prop.className}>
      <FormControl fullWidth required>
        <Autocomplete
          disablePortal
          id={"roomNum"}
          value={prop.room}
          options={items}
          onChange={handleDropdown}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              variant="filled"
              label={prop.label}
            />
          )}
        >
          {/*{rooms.map((one: { long_name: string | number | readonly string[] | undefined; }) => <MenuItem value={one.long_name}>one.long_name</MenuItem>)}*/}
        </Autocomplete>
      </FormControl>
    </div>
  );
}
