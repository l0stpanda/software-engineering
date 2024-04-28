import { Autocomplete, FormControl, TextField } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";
type locationProps = {
  room: string;
  update: (a: string) => void;
  label: string;
  className?: string;
};

export default function LocationDropdown(prop: locationProps) {
  const [rooms, setRoom] = useState<string[]>([]);

  useEffect(() => {
    handleDropDown().then();
  }, []);

  async function handleDropDown() {
    const res: AxiosResponse<{ long_name: string }[]> = await axios.get<
      { long_name: string }[]
    >("api/import/nodeLongNames");
    const arr: string[] = [];
    // console.log(res.data.length);
    for (let i = 0; res.data.length > i; i++) {
      console.log("here");
      arr.push(res.data[i].long_name);
    }

    // console.log("THIS IS THE ARRAY: " + arr);
    setRoom(arr);
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
          options={rooms}
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
