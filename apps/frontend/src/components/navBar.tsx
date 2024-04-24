import React, { useEffect } from "react";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import StorageIcon from "@mui/icons-material/Storage";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import BWLogo from "/BWLogo.png";
import { useAuth0 } from "@auth0/auth0-react";

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
  // const [anchorElAdmin, setAnchorElAdmin] = React.useState<null | HTMLElement>(
  //   null,
  // );
  // const openAdmin = Boolean(anchorElAdmin);

  function handleRequestsOpen(e: React.MouseEvent<HTMLElement>) {
    setAnchorEl(e.currentTarget);
  }

  function handleRequestsClosed() {
    setAnchorEl(null);
  }
  // function handleAdminOpen(e: React.MouseEvent<HTMLElement>) {
  //   setAnchorElAdmin(e.currentTarget);
  // }
  //
  // function handleAdminClosed() {
  //   setAnchorElAdmin(null);
  // }

  // const useStyles = makeStyles(() => ({
  //     customHoverFocus: {
  //         "&:hover, &.Mui-focusVisible": { color: "primary" }
  //     }
  // }));

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
          <div className="flex flex-row py-3 px-2">
            <Tooltip title={"View Map"}>
              <IconButton
                href="map"
                style={{
                  marginLeft: "1rem",
                }}
              >
                <MapIcon className="svg_icons" />
              </IconButton>
            </Tooltip>
            <Tooltip title={"View Tables"}>
              <IconButton
                href="displayTables"
                style={{
                  marginLeft: "1rem",
                }}
              >
                <BackupTableIcon className="svg_icons" />
              </IconButton>
            </Tooltip>

            <Tooltip title={"Service Requests"}>
              <IconButton
                onClick={handleRequestsOpen}
                style={{
                  marginLeft: "1rem",
                }}
              >
                <StorageIcon className="svg_icons" />
              </IconButton>
            </Tooltip>
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
              <MenuItem href="sanitationRequest" component="a">
                Sanitation Request
              </MenuItem>
            </Menu>
            <Tooltip title={"Todo List"}>
              <IconButton
                href="todo"
                style={{
                  marginLeft: "1rem",
                }}
              >
                <CheckBoxIcon className="svg_icons" />
              </IconButton>
            </Tooltip>
            <div
              className="flex flex-row gap-1"
              style={{
                marginLeft: "45rem",
              }}
            >
              <div className="flex flex-row gap-3 align-right">
                <p
                  className="object-contain text-center"
                  style={{
                    color: "#002866",
                    fontSize: "1 rem",
                    paddingTop: "0.5rem",
                    paddingLeft: "8rem",
                  }}
                >
                  <strong>Welcome,</strong> {user.name}
                </p>
                <Tooltip title={"Click to Logout"}>
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="rounded-full h-10 w-10 object-contain"
                    onClick={handleLogout}
                  />
                </Tooltip>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </AppBar>
  );
}

export default CustomNavBar;
