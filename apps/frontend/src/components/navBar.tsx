import React, { useEffect } from "react";
import { AppBar, Button, Menu, MenuItem, Toolbar } from "@mui/material";
import BWLogo from "/BWLogo.png";
import { useAuth0 } from "@auth0/auth0-react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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
        await getAccessTokenSilently();
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
            <Button component="a" href="exp">
              Import/Export
            </Button>
            <Button component="a" href="displayTables">
              View Tables
            </Button>
            <Button
              onClick={handleRequestsOpen}
              startIcon={<ArrowDropDownIcon />}
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
