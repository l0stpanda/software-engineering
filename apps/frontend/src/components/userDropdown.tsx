import { Autocomplete, FormControl, TextField } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";
type locationProps = {
  room: string;
  update: (a: string) => void;
  label: string;
};

export default function UserDropdown(prop: locationProps) {
  const [rooms, setRoom] = useState<string[]>([]);

  useEffect(() => {
    handleDropDown().then();
  }, []);

  async function handleDropDown() {
    const res: AxiosResponse<{ username: string }[]> =
      await axios.get<{ username: string }[]>("/api/userAdding");
    const arr: string[] = [];
    // console.log(res.data.length);
    for (let i = 0; res.data.length > i; i++) {
      console.log("here");
      arr.push(res.data[i].username);
    }

    console.log("THIS IS USER THE ARRAY: " + arr);
    setRoom(arr);
  }

  //Seperate for the dropdown changes
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
    <>
      <FormControl>
        <Autocomplete
          disablePortal
          id={"username"}
          value={prop.room}
          options={rooms}
          onChange={handleDropdown}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              variant="filled"
              style={{ minWidth: 275 }}
              label={prop.label}
            />
          )}
        >
          {/*{rooms.map((one: { long_name: string | number | readonly string[] | undefined; }) => <MenuItem value={one.long_name}>one.long_name</MenuItem>)}*/}
        </Autocomplete>
      </FormControl>
    </>
  );
}
