import React from "react";
import { AppBar, Button, Menu, MenuItem, Toolbar } from "@mui/material";
import BWLogo from "/BWLogo.png";
//import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function CustomNavBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleRequestsOpen(e: React.MouseEvent<HTMLElement>) {
    setAnchorEl(e.currentTarget);
  }

  function handleRequestsClosed() {
    setAnchorEl(null);
  }

  return (
    <AppBar sx={{ bgcolor: "#FBFEFF" }}>
      <div className="w-full flex justify-between">
        <Toolbar disableGutters={true}>
          <div className="h-12 flex px-2 py-2">
            <img
              src={BWLogo}
              className="object-contain"
              alt="Brigham & Women's Hospital"
            />
          </div>
        </Toolbar>
        <div className="flex align-middle py-3 px-2 gap-2">
          <Button component="a" href="">
            Home
          </Button>
          <Button component="a" href="map">
            Map
          </Button>
          <Button
            onClick={handleRequestsOpen}
            //endIcon={<KeyboardArrowDownIcon />}
          >
            Service Requests
          </Button>
          <Menu
            open={open}
            onClose={handleRequestsClosed}
            anchorEl={anchorEl}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem href="flowerrequest" component="a">
              Flower Request
            </MenuItem>
            <MenuItem href="viewpending" component="a">
              Pending
            </MenuItem>
            <MenuItem href="imp" component="a">
              Import/Export
            </MenuItem>
          </Menu>
          <Button variant="contained" sx={{ margin: "0 0 0 1rem" }}>
            Logout
          </Button>
        </div>
      </div>
    </AppBar>
  );
}

export default CustomNavBar;
