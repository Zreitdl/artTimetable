import React from "react";

// import NavLink from "../NavLink";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  Box,
  List,
//  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import Header from "../Header";

import style from "./_.module.scss";
// import ViewListIcon from "@mui/icons-material/ViewList";


interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Box className={style.boxContainer}>
        <div className={style.aside}>
          <Typography className={style.logo} color={"text"} variant="h6">
            ArtTimetable
          </Typography>
          <List>
            <NavLink
              to={"/"}
              className={style.navLink}
              children={({ isActive }) => {
                return (
                  <ListItemButton>
                    <ListItemIcon
                      sx={{
                        minWidth: 28,
                        // display: "flex",
                        // alignItems: "center",
                      }}
                    >
                      <CalendarMonthIcon
                        color={isActive ? "primary" : "inherit"}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          color={isActive ? "primary" : "text"}
                          variant="body1"
                        >
                          Timetable
                        </Typography>
                      }
                    />
                  </ListItemButton>
                );
              }}
            />
            {/* <NavLink
              to={"/list"}
              className={style.navLink}
              children={({ isActive }) => {
                return (
                  <ListItemButton>
                    <ListItemIcon
                      sx={{
                        minWidth: 28,
                      }}
                    >
                      <ViewListIcon color={isActive ? "primary" : "inherit"} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          color={isActive ? "primary" : "text"}
                          variant="body1"
                        >
                          Timetable records list
                        </Typography>
                      }
                    />
                  </ListItemButton>
                );
              }}
            /> */}
          </List>
        </div>
        <Header className={style.header} />
        <Box className={style.main}>
          <div className={style.content}>{children}</div>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
