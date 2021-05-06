import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import ListAltIcon from "@material-ui/icons/ListAlt";

const MainListItems = ({ setShowOrders, handleDrawerClose }) => {
  return (
    <div>
      <ListItem
        button
        onClick={() => {
          setShowOrders(false);
          handleDrawerClose();
        }}
      >
        <ListItemIcon>
          <AddAlertIcon />
        </ListItemIcon>
        <ListItemText primary="Create New Alerts" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          setShowOrders(true);
          handleDrawerClose();
        }}
      >
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary="Alerts Status" />
      </ListItem>
    </div>
  );
};

export default MainListItems;