import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Title from "./Title";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { format } from "date-fns/esm";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import Typography from "@material-ui/core/Typography";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import Loader from "./alertsLoader";


const statusMapping = {
  active: {
    label: "Active",
    color: "secondary",
  },
  deleted: {
    label: "Deleted",
    color: "error",
  },
  triggered: {
    label: "Triggered",
    color: "primary",
  },
  expired: {
    label: "Expired",
    color: "error",
  },
};

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  root:{
    margin: "10px"
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    // display: "flex",
    // flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function Orders() {
  const classes = useStyles();
  const theme = useTheme();

  const [alertList, setAlertList] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    const alerts = JSON.parse(localStorage.getItem("alerts") || "[]");
    let queryIds = [];
    let query = "";
    if (alerts.length > 0) {
      alerts.forEach((alert) => {
        if (alert.id) {
          queryIds.push(alert.id);
        }
      });
      query = queryIds.join("&ids[]=");
    }
    fetch(
      `http://65.1.224.183:3000/api/v1/alerts/get_from_ids?ids[]=${query}`
    ).then((res) => {
      res.json().then((response) => {
        setAlertList(response);
        setisLoading(false);
      });
    });
  }, []);

  const renderCard = () => {
    return alertList.map((alert) => {
      return (
        <Card className={classes.root}>
          <CardContent >
            <Grid container>
              <Grid xs={6} sm={6}>
                <Typography variant="subtitle1" color="textPrimary">
                  {format(new Date(alert.start_date), "do MMM yy")} to{" "}
                  {format(new Date(alert.end_date), "do MMM yy")}
                </Typography>
              </Grid>
              <Grid
                xs={6}
                sm={6}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Chip
                  avatar={<SupervisedUserCircleIcon />}
                  label={`${alert.age_limit}+`}
                  deleteIcon={<DoneIcon />}
                />
                <Chip
                  style={{ marginLeft: "5px" }}
                  avatar={
                    <NotificationsIcon
                      style={{ backgroundColor: "transparent" }}
                    />
                  }
                  label={statusMapping[alert.status]?.label}
                  color={statusMapping[alert.status]?.color}
                  clickable
                  deleteIcon={<DoneIcon />}
                />
              </Grid>
              <Grid xs={6} sm={6}
                style={{ display: "flex", justifyContent: "flex-start", marginTop: "10px" }}
              >
                <Typography variant="subtitle1" color="textSecondary">
                  {alert.search_identifer.toUpperCase()}: {alert.search_term}
                </Typography>
              </Grid>
              <Grid xs={6} sm={6}
                style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}
              >
                <Chip
                  size="small"
                  avatar={
                    <WhatsAppIcon
                      style={{
                        color: "#19857b",
                        backgroundColor: "transparent",
                      }}
                    />
                  }
                  label={`+91${alert.mobile}`}
                  color={"secondary"}
                  clickable
                  variant="outlined"
                  deleteIcon={<DoneIcon />}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      );
    });
  };

  return (
    <React.Fragment>
      <Title>Your Alerts</Title>
      <div className={classes.content}>
        {
          isLoading ? <Loader /> : renderCard()
        }
      </div>
    </React.Fragment>
  );
}
