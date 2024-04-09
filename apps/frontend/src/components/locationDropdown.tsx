import { Autocomplete, FormControl, TextField } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";

import axios from "axios";
type locationProps = {
  room: string;
  update: (a: string) => void;
};

export default function LocationDropdown(prop: locationProps) {
  const [rooms, setRoom] = useState<string[]>([]);

  useEffect(() => {
    handleDropDown().then();
  }, []);

  async function handleDropDown() {
    const res = await axios.get("api/import/nodeLongNames");
    setRoom(res.data);
  }

  //Seperate for the dropdown changes
  function handleDropdown(
    e: SyntheticEvent<Element, Event>,
    value: string | null,
  ) {
    if (value) {
      //value = value.replace("{label: '", "");
      prop.update(value);
    }
  }

  return (
    <>
      <FormControl>
        <Autocomplete
          disablePortal
          id={"roomNum"}
          value={prop.room}
          options={rooms}
          onChange={handleDropdown}
          renderInput={(params) => <TextField {...params} label="Room" />}
        >
          {/*{rooms.map((one: { long_name: string | number | readonly string[] | undefined; }) => <MenuItem value={one.long_name}>one.long_name</MenuItem>)}*/}
        </Autocomplete>
      </FormControl>
    </>
  );
}
