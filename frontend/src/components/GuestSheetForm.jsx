import { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CircularProgress,
  Typography,
  Grid,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import api from "../api";
import SignaturePad from "./SignaturePad";
import { useNavigate } from "react-router-dom";
import "dayjs/locale/de"; // Import the locale if needed

// Set the date format
const DATE_FORMAT = "YYYY-MM-DD";

const GuestsheetForm = () => {
  const [formValues, setFormValues] = useState({});
  const [signature, setSignature] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const onFinish = () => {
    setLoading(true);

    // Format the dates to YYYY-MM-DD
    const formattedValues = {
      ...formValues,
      date_of_birth: formValues.date_of_birth
        ? dayjs(formValues.date_of_birth).format(DATE_FORMAT)
        : null,
      date_of_issue: formValues.date_of_issue
        ? dayjs(formValues.date_of_issue).format(DATE_FORMAT)
        : null,
      date_of_arrival: formValues.date_of_arrival
        ? dayjs(formValues.date_of_arrival).format(DATE_FORMAT)
        : null,
      date_of_departure: formValues.date_of_departure
        ? dayjs(formValues.date_of_departure).format(DATE_FORMAT)
        : null,
      actual_departure: formValues.actual_departure
        ? dayjs(formValues.actual_departure).format(DATE_FORMAT)
        : null,
      traveling_with_date_of_birth: formValues.traveling_with_date_of_birth
        ? dayjs(formValues.traveling_with_date_of_birth).format(DATE_FORMAT)
        : null,
      signature,
    };

    api
      .post("/api/guestsheet/", formattedValues)
      .then((response) => {
        console.log("Success:", response.data);
        setFormValues({});
        setSignature("");
        navigate("/success");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to create entry.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSave = (dataURL) => {
    setSignature(dataURL);
    console.log("Signature saved:", dataURL);
  };

  return (
    <div
      style={{
        position: "relative",
        padding: 20,
        maxWidth: 800,
        margin: "auto",
      }}
    >
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <CircularProgress />
        </div>
      )}
      <Card style={{ padding: 20 }}>
        <Typography variant="h4" gutterBottom>
          Guest Information
        </Typography>

        <Grid container spacing={2} direction="column">
          {/* First Name */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="First Name"
              required
              value={formValues.first_name || ""}
              onChange={(e) => handleChange("first_name", e.target.value)}
            />
          </Grid>

          {/* Last Name */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Last Name"
              required
              value={formValues.last_name || ""}
              onChange={(e) => handleChange("last_name", e.target.value)}
            />
          </Grid>

          {/* Date of Birth */}
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                margin="normal"
                disableFuture
                openTo="year"
                views={["year", "month", "day"]}
                inputFormat={DATE_FORMAT}
                value={
                  formValues.date_of_birth
                    ? dayjs(formValues.date_of_birth, DATE_FORMAT)
                    : null
                }
                onChange={(date) =>
                  handleChange(
                    "date_of_birth",
                    date ? date.format(DATE_FORMAT) : null
                  )
                }
                renderInput={(params) => (
                  <TextField {...params} fullWidth required />
                )}
              />
            </LocalizationProvider>
          </Grid>

          {/* Nationality */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nationality"
              required
              value={formValues.nationality || ""}
              onChange={(e) => handleChange("nationality", e.target.value)}
            />
          </Grid>

          {/* Travel Document */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Travel Document"
              required
              value={formValues.travel_document || ""}
              onChange={(e) => handleChange("travel_document", e.target.value)}
            />
          </Grid>

          {/* Document Number */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Document Number"
              required
              value={formValues.document_number || ""}
              onChange={(e) => handleChange("document_number", e.target.value)}
            />
          </Grid>

          {/* Date of Issue */}
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Issue"
                margin="normal"
                disableFuture
                openTo="year"
                views={["year", "month", "day"]}
                inputFormat={DATE_FORMAT}
                value={
                  formValues.date_of_issue
                    ? dayjs(formValues.date_of_issue, DATE_FORMAT)
                    : null
                }
                onChange={(date) =>
                  handleChange(
                    "date_of_issue",
                    date ? date.format(DATE_FORMAT) : null
                  )
                }
                renderInput={(params) => (
                  <TextField {...params} fullWidth required />
                )}
              />
            </LocalizationProvider>
          </Grid>

          {/* Issuing Authority */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Issuing Authority"
              required
              value={formValues.issuing_authority || ""}
              onChange={(e) =>
                handleChange("issuing_authority", e.target.value)
              }
            />
          </Grid>

          {/* Issuing Country */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Issuing Country"
              required
              value={formValues.issuing_country || ""}
              onChange={(e) => handleChange("issuing_country", e.target.value)}
            />
          </Grid>

          {/* Domicile Place */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Domicile Place"
              required
              value={formValues.domicile_place || ""}
              onChange={(e) => handleChange("domicile_place", e.target.value)}
            />
          </Grid>

          {/* Domicile Zip Code */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Domicile Zip Code"
              required
              value={formValues.domicile_zip_code || ""}
              onChange={(e) =>
                handleChange("domicile_zip_code", e.target.value)
              }
            />
          </Grid>

          {/* Domicile Street */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Domicile Street"
              required
              value={formValues.domicile_street || ""}
              onChange={(e) => handleChange("domicile_street", e.target.value)}
            />
          </Grid>

          {/* Domicile Country */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Domicile Country"
              required
              value={formValues.domicile_country || ""}
              onChange={(e) => handleChange("domicile_country", e.target.value)}
            />
          </Grid>

          {/* Traveling With Surname */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Traveling With Surname"
              value={formValues.traveling_with_surname || ""}
              onChange={(e) =>
                handleChange("traveling_with_surname", e.target.value)
              }
            />
          </Grid>

          {/* Traveling With First Name */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Traveling With First Name"
              value={formValues.traveling_with_first_name || ""}
              onChange={(e) =>
                handleChange("traveling_with_first_name", e.target.value)
              }
            />
          </Grid>

          {/* Traveling With Date of Birth */}
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Traveling With Birthdate"
                margin="normal"
                disableFuture
                openTo="year"
                views={["year", "month", "day"]}
                inputFormat={DATE_FORMAT}
                value={
                  formValues.traveling_with_date_of_birth
                    ? dayjs(
                        formValues.traveling_with_date_of_birth,
                        DATE_FORMAT
                      )
                    : null
                }
                onChange={(date) =>
                  handleChange(
                    "traveling_with_date_of_birth",
                    date ? date.format(DATE_FORMAT) : null
                  )
                }
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>

          {/* Total Guests */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Total Guests"
              type="number"
              required
              value={formValues.total_guests || ""}
              onChange={(e) => handleChange("total_guests", e.target.value)}
            />
          </Grid>

          {/* Date of Arrival */}
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Arrival"
                margin="normal"
                openTo="year"
                views={["year", "month", "day"]}
                inputFormat={DATE_FORMAT}
                value={
                  formValues.date_of_arrival
                    ? dayjs(formValues.date_of_arrival, DATE_FORMAT)
                    : null
                }
                onChange={(date) =>
                  handleChange(
                    "date_of_arrival",
                    date ? date.format(DATE_FORMAT) : null
                  )
                }
                renderInput={(params) => (
                  <TextField {...params} fullWidth required />
                )}
              />
            </LocalizationProvider>
          </Grid>

          {/* Date of Departure */}
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Departure"
                margin="normal"
                openTo="year"
                views={["year", "month", "day"]}
                inputFormat={DATE_FORMAT}
                value={
                  formValues.date_of_departure
                    ? dayjs(formValues.date_of_departure, DATE_FORMAT)
                    : null
                }
                onChange={(date) =>
                  handleChange(
                    "date_of_departure",
                    date ? date.format(DATE_FORMAT) : null
                  )
                }
                renderInput={(params) => (
                  <TextField {...params} fullWidth required />
                )}
              />
            </LocalizationProvider>
          </Grid>

          {/* Actual Departure */}
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Actual Departure"
                margin="normal"
                openTo="year"
                views={["year", "month", "day"]}
                inputFormat={DATE_FORMAT}
                value={
                  formValues.actual_departure
                    ? dayjs(formValues.actual_departure, DATE_FORMAT)
                    : null
                }
                onChange={(date) =>
                  handleChange(
                    "actual_departure",
                    date ? date.format(DATE_FORMAT) : null
                  )
                }
                renderInput={(params) => (
                  <TextField {...params} fullWidth required />
                )}
              />
            </LocalizationProvider>
          </Grid>

          {/* Signature */}
          <Grid item xs={12}>
            <Typography variant="body1">
              <span style={{ color: "red" }}>*</span> Signature
            </Typography>
            <SignaturePad onSave={handleSave} />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={onFinish}
              disabled={!signature || loading}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default GuestsheetForm;
