import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import DateFnsUtils from "@date-io/date-fns";
import { addDays } from "date-fns/esm";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from '@material-ui/core/Button';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(0.8),
      minWidth: 220,
    },
    fullWidth: {
      margin: theme.spacing(1),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    buttons: {
      display: 'flex',
      marginTop: theme.spacing(2)
    },
  })
);

export default function AddressForm({
  handleNext
}) {
  const handleChange = (event) => {
    setAge(event.target.value);
    if (event.target.value) {
      setErrors({ ...errors, age: false });
    } else {
      setErrors({ ...errors, age: true });
    }
  };

  const handleChangeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const [errors, setErrors] = React.useState({
    pincode: null,
    startDate: null,
    districtId: null,
    stateId: null,
    age: null,
    mobile: null
  });
  const [stateList, setStateList] = React.useState([]);
  const [stateId, setStateId] = React.useState("");
  const [districtId, setDistrictId] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [districtList, setDistrictList] = React.useState([]);
  const [age, setAge] = React.useState("");
  const [mobile, setMobile] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("pincode");
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = React.useState(
    addDays(new Date(), 7)
  );

  React.useEffect(() => {
    fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states").then(
      (response) => {
        response.json().then(({ states }) => {
          setStateList(states);
        });
      }
    );
  }, []);

  React.useEffect(() => {
    if (stateId) {
      fetch(
        `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`
      ).then((response) => {
        response.json().then(({ districts }) => {
          setDistrictList(districts);
        });
      });
    }
  }, [stateId]);

  const renderStateMenus = () => {
    return stateList.map((state) => {
      return <MenuItem value={state.state_id}>{state.state_name}</MenuItem>;
    });
  };

  const renderDistrictMenus = () => {
    return districtList.map((state) => {
      return (
        <MenuItem value={state.district_id}>{state.district_name}</MenuItem>
      );
    });
  };

  const onChangeMobile = (e) => {
    if (e.target?.value && (e.target?.value?.toString()).length <= 10) {
      setMobile(e.target?.value);
      if ((e.target?.value?.toString()).length === 10) {
        setErrors({ ...errors, mobile: false });
      }
    } else if ((e.target?.value?.toString()).length === 0) {
      setMobile(e.target?.value);
      setErrors({ ...errors, mobile: true });
    }
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedEndDate(addDays(date, 7));
    setErrors({ ...errors, startDate: false });
  };

  const handleChangePincode = (e) => {
    setPincode(e.target.value);
    if (e.target.value) {
      setErrors({ ...errors, pincode: false });
    } else {
      setErrors({ ...errors, pincode: true });
    }
  }

  const validate = () => {
    let errorObj = {};
    if (searchTerm === "pincode") {
      if (!pincode) {
        errorObj.pincode = true
      }
    } else {
      if (!districtId) {
        errorObj.districtId = true
      }
      if (!stateId) {
        errorObj.stateId = true
      }
    }
    if (!selectedDate) {
      errorObj.startDate = true
    }
    if (!mobile || mobile?.length !== 10) {
      errorObj.mobile = true
    }
    if (!age) {
      errorObj.age = true
    }

    if (Object.keys(errorObj).length === 0) {
      fetch("http://65.1.224.183:3000/api/v1/alerts.json", {
        body: JSON.stringify({
          alert: {
            start_date: selectedDate,
            end_date: selectedEndDate,
            age_limit: age,
            search_identifer: searchTerm,
            search_term: searchTerm === "pincode" ? pincode : districtId,
            email_id: "parth.pnp5@gmail.com",
            mobile: mobile
          }
        }),
        headers: new Headers({'content-type': 'application/json'}),
        method: "POST",
      }).then((res) => {
        res.json().then((response) => {
          handleNext();
          setToLS(response);
        });
      });
    } else {
      setErrors(errorObj);
    }
  }

  const setToLS = (response) => {
    let alerts =  JSON.parse(localStorage.getItem("alerts") || "[]");
    alerts.push(response);
    localStorage.setItem("alerts", JSON.stringify(alerts));
  }

  const classes = useStyles();

  return (
    <React.Fragment>
      {/* <Typography variant="h6" gutterBottom>
        Vaccine Center By
      </Typography> */}
      <Grid container spacing={0}>
        <Grid  xs={12} sm={12}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Vaccine Center By</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={searchTerm}
              onChange={handleChangeSearchTerm}
              row
              aria-label="position"
              name="position"
              defaultValue="top"
            >
              <FormControlLabel
                value="pincode"
                control={<Radio />}
                label="Pincode"
              />
              <FormControlLabel
                value="district"
                control={<Radio />}
                label="District"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {searchTerm === "district" && (
          <>
            <Grid  xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">
                  State
                </InputLabel>
                <Select
                  labelId="state-label"
                  id="state"
                  error={errors.stateId}
                  value={stateId}
                  onChange={(e) => {
                    setStateId(e.target.value);
                    if (e.target.value) {
                      setErrors({ ...errors, stateId: false });
                    } else {
                      setErrors({ ...errors, stateId: true });
                    }
                  }}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  {stateList && renderStateMenus()}
                </Select>
              </FormControl>
            </Grid>
            <Grid  xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">
                  District
                </InputLabel>
                <Select
                  labelId="district-label"
                  id="district"
                  error={errors.districtId}
                  value={districtId}
                  onChange={(e) => {
                    setDistrictId(e.target.value);
                    if (e.target.value) {
                      setErrors({ ...errors, districtId: false });
                    } else {
                      setErrors({ ...errors, districtId: true });
                    }
                  }}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  {stateList && renderDistrictMenus()}
                </Select>
              </FormControl>
            </Grid>
          </>
        )}
        {searchTerm === "pincode" && (
          <Grid  xs={12} sm={12}>
            <FormControl className={classes.formControl}>
              <TextField
                required
                id="zip"
                name="zip"
                error={errors.pincode}
                label="Zip / Postal code"
                fullWidth
                autoComplete="shipping postal-code"
                value={pincode}
                onChange={handleChangePincode}
              />
              <FormHelperText>Allow Vaccine center by Pincode</FormHelperText>
            </FormControl>
          </Grid>
        )}
        <Grid  xs={12} sm={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="age-limit-label">Age Limit</InputLabel>
            <Select
              labelId="age-limit-label"
              id="age-limit"
              error={errors.age}
              value={age}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              <MenuItem value={18}>18+</MenuItem>
              <MenuItem value={45}>45+</MenuItem>
            </Select>
            <FormHelperText>
              We will search for slots with this age limit
            </FormHelperText>
          </FormControl>
        </Grid>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid  xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Alert Start Date"
                error={errors.startDate}
                format="dd/MM/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                helperText="Upcoming 7 days slots from start date"
              />
            </FormControl>
          </Grid>
          <Grid  xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Alert End Date"
                format="dd/MM/yyyy"
                disabled={true}
                value={selectedEndDate}
                // onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                helperText="We will search for slots upto this date"
              />
            </FormControl>
          </Grid>
        </MuiPickersUtilsProvider>
        <Grid  xs={12} sm={12}>
          <FormControl className={classes.fullWidth}>
            <TextField
              required
              id="mobile"
              name="mobile"
              error={errors.mobile}
              value={mobile}
              label="WhatsApp Mobile No."
              type="number"
              fullWidth
              onChange={onChangeMobile}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
            />
            <FormHelperText>
              Alert Message will sent to this number
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid  xs={12} sm={12}
            style={{justifyContent: 'center', display: "flex"}}
        >
          <Button
            variant="contained"
            className="center"
            color="primary"
            onClick={validate}
            className={classes.buttons}
          >
            Create Alert
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
