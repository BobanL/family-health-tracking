import * as React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Link } from "react-router-dom";

export const mainListItems = (tableName, fieldName, id, classes) => {
  return (
    <div>
      <Link
        style={{ textDecoration: "none", color: "#000" }}
        to={{
          pathname: `/table`,
          state: {
            tableName,
            fieldName,
            id,
            classes,
          },
        }}
      >
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>
      <Link
        style={{ textDecoration: "none", color: "#000" }}
        to={{
          pathname: `/login`,
          state: {
            tableName,
            fieldName,
            id,
            classes,
          },
        }}
      >
        <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Change Family Unit" />
        </ListItem>
      </Link>
    </div>
  );
};

export const secondaryListItems = (
  name,
  formFields,
  tableName,
  classes,
  fieldName,
  id
) => (
  <div>
    <ListSubheader inset>{name}</ListSubheader>
    <Link
      style={{ textDecoration: "none", color: "#000" }}
      to={{
        pathname: `/AddForm`,
        state: {
          form: formFields,
          table: tableName,
        },
      }}
    >
      <ListItem button>
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary={"Add " + name} />
      </ListItem>
    </Link>
    <Link
      style={{ textDecoration: "none", color: "#000" }}
      to={{
        pathname: `/table`,
        state: {
          form: formFields,
          table: tableName,
          fieldName,
          id,
          tableName,
          classes,
        },
      }}
    >
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary={name + " Info"} />
      </ListItem>
    </Link>
  </div>
);
