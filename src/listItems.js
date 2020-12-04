import * as React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Link } from "react-router-dom";

export const mainListItems = (
  <div>
    <Link
      style={{ textDecoration: "none", color: "#000" }}
      to={{
        pathname: `/`,
      }}
    >
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
  </div>
);

export const secondaryListItems = (name, formFields) => (
  <div>
    <ListSubheader inset>{name}</ListSubheader>
    <Link
      style={{ textDecoration: "none", color: "#000" }}
      to={{
        pathname: `/AddForm`,
        state: {
          form: formFields,
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
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary={"List " + name} />
    </ListItem>
  </div>
);
