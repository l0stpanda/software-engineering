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
import BackpackIcon from "@mui/icons-material/Backpack";
import { MoreHoriz } from "@mui/icons-material";

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
        <Toolbar disableGutters={true} sx={{ width: "100%" }}>
          <div className="h-12 flex px-2 py-2 min-w-fit">
            <a href="">
              <img
                src={BWLogo}
                className="object-contain transition-transform duration-300 hover:scale-90"
                style={{ width: "100%", height: "100%" }}
                alt="Brigham & Women's Hospital"
              />
            </a>
          </div>

          {user ? (
            <div className="flex flex-row py-3 px-2 justify-between w-full">
              <div>
                <Tooltip title={"View Map"}>
                  <IconButton
                    href="map"
                    className="hover:scale-110 duration-200 transition-transform"
                    sx={{
                      marginLeft: "1rem",
                      "&:hover, &.active": {
                        color: "#002866",
                      },
                    }}
                  >
                    <MapIcon className="svg_icons" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={"View Tables"}>
                  <IconButton
                    href="displayTables"
                    className="hover:scale-110 duration-200 transition-transform"
                    sx={{
                      marginLeft: "1rem",
                      "&:hover, &:focus": {
                        color: "#002866",
                      },
                    }}
                  >
                    <StorageIcon className="svg_icons" />
                  </IconButton>
                </Tooltip>

                <Tooltip title={"Service Requests"}>
                  <IconButton
                    href="requests"
                    // onClick={handleRequestsOpen}
                    className="hover:scale-110 duration-200 transition-transform"
                    sx={{
                      marginLeft: "1rem",
                      "&:hover, &:focus": {
                        color: "#002866",
                      },
                    }}
                  >
                    <BackupTableIcon className="svg_icons" />
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
                  <MenuItem href="aboutPage" component="a">
                    About
                  </MenuItem>
                  <MenuItem href="credit" component="a">
                    Credits
                  </MenuItem>
                </Menu>
                <Tooltip title={"Todo List"}>
                  <IconButton
                    href="todo"
                    className="hover:scale-110 duration-200 transition-transform"
                    sx={{
                      marginLeft: "1rem",
                      "&:hover, &:active": {
                        color: "#002866",
                      },
                    }}
                  >
                    <CheckBoxIcon className="svg_icons" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Inventory"}>
                  <IconButton
                    href="inventory"
                    className="hover:scale-110 duration-200 transition-transform"
                    sx={{
                      marginLeft: "1rem",
                      "&:hover, &:active": {
                        color: "#002866",
                      },
                    }}
                  >
                    <BackpackIcon className="svg_icons" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={"More"}>
                  <IconButton
                    onClick={handleRequestsOpen}
                    className="hover:scale-110 duration-200 transition-transform"
                    sx={{
                      marginLeft: "1rem",
                      "&:hover": {
                        color: "#002866",
                      },
                    }}
                  >
                    <MoreHoriz className="svg_icons" />
                  </IconButton>
                </Tooltip>
              </div>
              {/*<div*/}
              {/*    className="flex flex-row gap-1"*/}
              {/*>*/}
              <div className="flex flex-row gap-3 align-right">
                <p
                  className="object-contain text-center transition-transform duration-500 hover:-translate-x-1"
                  style={{
                    color: "#002866",
                    fontSize: "1rem",
                    paddingTop: "0.5rem",
                  }}
                >
                  <strong>Welcome,</strong> {user.nickname}
                </p>
                <Tooltip title={"Click to Logout"}>
                  <img
                    src={user.picture}
                    className="rounded-full h-10 w-10 object-contain transition-transform duration-200 hover:scale-110"
                    alt={user.nickname}
                    onClick={handleLogout}
                  />
                </Tooltip>
                {/*</div>*/}
              </div>
            </div>
          ) : (
            <></>
          )}
        </Toolbar>
      </div>
    </AppBar>
  );
}

export default CustomNavBar;
