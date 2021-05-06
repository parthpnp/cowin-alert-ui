import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
export default function PaymentForm({
  handleNext
}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Subscribe WhatsApp Notification
      </Typography>
      <Grid container spacing={0}>
        {/* <div onClick={ () => {}}> */}
        <Grid
          xs={12}
          sm={12}
          style={{
            margin: "20px",
            cursor: "pointer",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
            onClick={() => {
              window
                .open(
                  "https://wa.me/+14155238886?text=join%20are-easier",
                  "_blank"
                )
                .focus();
                handleNext();
            }}
          >
            <strong style={{ color: "#556cd6", marginRight: "10px", }}>
              Click Here
            </strong>
            <WhatsAppIcon fontSize="large" color="primary" />
          </div>
        </Grid>
        <Typography variant="p" gutterBottom>
          Click here or send a WhatsApp message to <WhatsAppIcon />{" "}
          <b>+1 415 523 8886</b> with code <b>join are-easier</b>
        </Typography>
      </Grid>
    </React.Fragment>
  );
}
