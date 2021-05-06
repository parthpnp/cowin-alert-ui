import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Ready to Recevice Alerts!
      </Typography>
      <Grid container spacing={2}>
        <Grid item container direction="column" xs={12} sm={12}>
          <span>You should see message like this once subscribed,</span>
        </Grid>
        <Grid item container direction="column" xs={12} sm={12}>
          <img
            src={"/wa-1.png"}
            style={{maxWidth: "inherit"}}
          />
        </Grid>
        <Grid container item xs={12} sm={12}>
          <Alert style={{display: "flex", justifyContent: "center"}} severity="success">All Ready to receive alerts. Stay tuned!</Alert>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
