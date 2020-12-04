import * as React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import { useStyles } from "./Dashboard";

export const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <div>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>
          {secondaryListItems("Family Unit", [
            { fieldName: "Parent 1 SSN" },
            { fieldName: "Parent 2 SSN" },
          ])}
        </List>
        <Divider />
        <List>
          {secondaryListItems("Family Members", [
            { fieldName: "SSN" },
            { fieldName: "First Name" },
            { fieldName: "Middle Name" },
            { fieldName: "Last Name" },
            { fieldName: "Sex" },
            { fieldName: "Birthday" },
            { fieldName: "Address" },
            { fieldName: "Family Unit" },
          ])}
        </List>
        <Divider />
        <List>
          {secondaryListItems("Medical Records", [
            { fieldName: "SSN" },
            { fieldName: "Date" },
            { fieldName: "Reason" },
            { fieldName: "Diagnosis" },
            { fieldName: "Doctor Number" },
          ])}
        </List>
        <Divider />
        <List>
          {secondaryListItems("Doctors", [
            { fieldName: "Doctor Name" },
            { fieldName: "Doctor Location" },
          ])}
        </List>
        <Divider />
        <List>
          {secondaryListItems("Illness", [
            { fieldName: "Illness Name" },
            { fieldName: "Medication Number" },
            { fieldName: "Illness Description" },
          ])}
        </List>
        <Divider />
        <List>
          {secondaryListItems("Medication", [
            { fieldName: "Medication Name" },
            { fieldName: "Medication Type" },
            { fieldName: "Medication Effect" },
          ])}
        </List>
      </Drawer>
    </div>
  );
};
