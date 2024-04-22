import React, { useEffect, useState } from "react";
import { AppBar, Button, Menu, MenuItem, Toolbar } from "@mui/material";
import BWLogo from "/BWLogo.png";
import { useAuth0 } from "@auth0/auth0-react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "axios";

function CustomNavBar() {
  const {
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    loginWithRedirect,
    user,
  } = useAuth0();

  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        axios
          .get("/api/adminAccess", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            setIsAdmin(true);
          })
          .catch();
      } catch (error) {
        await loginWithRedirect({
          appState: {
            returnTo: "map",
          },
        });
      }
    };

    if (!isLoading && isAuthenticated) {
      getAuthToken();
    }
  }, [getAccessTokenSilently, isAuthenticated, isLoading, loginWithRedirect]);

  const { logout } = useAuth0();
  async function handleLogout() {
    await logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [anchorElAdmin, setAnchorElAdmin] = React.useState<null | HTMLElement>(
    null,
  );
  const openAdmin = Boolean(anchorElAdmin);
  const [isAdmin, setIsAdmin] = useState(false);

  function handleRequestsOpen(e: React.MouseEvent<HTMLElement>) {
    setAnchorEl(e.currentTarget);
  }

  function handleRequestsClosed() {
    setAnchorEl(null);
  }

  function handleAdminOpen(e: React.MouseEvent<HTMLElement>) {
    setAnchorElAdmin(e.currentTarget);
  }

  function handleAdminClosed() {
    setAnchorElAdmin(null);
  }

  return (
    <AppBar sx={{ bgcolor: "#FBFEFF" }}>
      <div className="w-full flex justify-between">
        <Toolbar disableGutters={true}>
          <div className="h-12 flex px-2 py-2">
            <a href="">
              <img
                src={BWLogo}
                className="object-contain"
                style={{ width: "100%", height: "100%" }}
                alt="Brigham & Women's Hospital"
              />
            </a>
          </div>
        </Toolbar>
        {user ? (
          <div className="flex align-middle py-3 px-2 gap-2">
            <Button component="a" href="">
              Home
            </Button>
            <Button component="a" href="map">
              Map
            </Button>
            {/*<Button component="a" href="imp">*/}
            {/*  Import*/}
            {/*</Button>*/}
            {isAdmin ? (
              <Button onClick={handleAdminOpen} endIcon={<ArrowDropDownIcon />}>
                Admin
              </Button>
            ) : (
              <></>
            )}
            <Menu
              open={openAdmin}
              onClose={handleAdminClosed}
              anchorEl={anchorElAdmin}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem href="exp" component="a">
                Import/Export
              </MenuItem>
              <MenuItem href="displayTables" component="a">
                View Tables
              </MenuItem>
            </Menu>
            <Button
              onClick={handleRequestsOpen}
              endIcon={<ArrowDropDownIcon />}
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
              <MenuItem href="viewpending" component="a">
                Pending
              </MenuItem>
              <MenuItem href="flowerrequest" component="a">
                Flower Request
              </MenuItem>
              <MenuItem href="medicinerequest" component="a">
                Medicine Delivery
              </MenuItem>
              <MenuItem href="roomrequest" component="a">
                Room Scheduling
              </MenuItem>
              <MenuItem href="medicaldevicerequest" component="a">
                Medical Device Delivery
              </MenuItem>
              <MenuItem href="lostitemrequest" component="a">
                Lost Item
              </MenuItem>
            </Menu>
            <Button component="a" href="todo">
              Task Board
            </Button>
            <Button
              variant="contained"
              sx={{ margin: "0 0 0 1rem" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </AppBar>
  );
}

export default CustomNavBar;
