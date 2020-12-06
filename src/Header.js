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
import { mainListItems, secondaryListItems } from "./listItems";
import { useStyles } from "./styles";
import Cookies from "universal-cookie";

export const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const cookies = new Cookies();
  const famUnitNumber = cookies.get("familyUnit");

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
            <Badge color="secondary">{cookies.get("familyUnit")}</Badge>
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
        <List>{mainListItems("med_rec", "SSN", 123, classes)}</List>
        <Divider />
        <List>
          {secondaryListItems(
            "Family Unit",
            [
              { fieldName: "Parent 1 SSN", tableName: "Parent1_SSN" },
              { fieldName: "Parent 2 SSN", tableName: "Parent2_SSN" },
            ],
            "fam_unit",
            classes,
            "FAM_Unum",
            famUnitNumber
          )}
        </List>
        <Divider />
        <List>
          {secondaryListItems(
            "Family Members",
            [
              { fieldName: "SSN", tableName: "SSN" },
              { fieldName: "First Name", tableName: "Fname" },
              { fieldName: "Middle Name", tableName: "Minit" },
              { fieldName: "Last Name", tableName: "Lname" },
              { fieldName: "Sex", tableName: "Sex" },
              { fieldName: "Birthday", tableName: "Bdate" },
              { fieldName: "Address", tableName: "Address" },
              { fieldName: "Family Unit", tableName: "Fam_unit" },
            ],
            "family_member",
            classes,
            "Fam_unit",
            famUnitNumber
          )}
        </List>
        <Divider />
        <List>
          {secondaryListItems(
            "Medical Records",
            [
              { fieldName: "SSN", tableName: "SSN" },
              { fieldName: "Date", tableName: "Date" },
              { fieldName: "Reason", tableName: "Reason" },
              { fieldName: "Illness Number", tableName: "I_num" },
              { fieldName: "Doctor Number", tableName: "Dnum" },
            ],
            "med_rec",
            classes,
            "1",
            "1"
          )}
        </List>
        <Divider />
        <List>
          {secondaryListItems(
            "Doctors",
            [
              { fieldName: "Doctor Name", tableName: "Dname" },
              { fieldName: "Doctor Location", tableName: "Dlocation" },
            ],
            "doctors",
            classes,
            "1",
            "1"
          )}
        </List>
        <Divider />
        <List>
          {secondaryListItems(
            "Illness",
            [
              { fieldName: "Illness Name", tableName: "Iname" },
              { fieldName: "Medication Number", tableName: "Med_num" },
              { fieldName: "Illness Description", tableName: "Idesc" },
            ],
            "illness",
            classes,
            "1",
            "1"
          )}
        </List>
        <Divider />
        <List>
          {secondaryListItems(
            "Medication",
            [
              { fieldName: "Medication Name", tableName: "name" },
              { fieldName: "Medication Type", tableName: "type" },
              { fieldName: "Medication Effect", tableName: "effects" },
            ],
            "medications",
            classes,
            "1",
            "1"
          )}
        </List>
      </Drawer>
    </div>
  );
};
