import React from "react";
import {
  Grid,
  Breadcrumbs,
  Typography,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import {
  Download,
  Close,
  ArrowForward,
} from "@mui/icons-material";
import { IconText, NavLink } from "./components";
import { FileUploader } from "react-drag-drop-files";

import { useTheme } from "@material-ui/styles";

import useApi from "../api/useApi";

const breadcrumbs = [
  <NavLink underline="hover" key="1" color="inherit" href="/">
    Home
  </NavLink>,
  <Typography key="2" color="black">
    Register
  </Typography>,
];

export default function RegisterCSV(props) {
  const theme = useTheme();
  const primary = theme.palette.primary;
  const disable = theme.palette.disable;
  const white = theme.palette.white;
  const [csv, setCSV] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const { register_new_test_csv } = useApi();

  const handleDownload = () => {
    var reader = new FileReader();
    reader.onloadend = function () {
      let base64 = reader.result;
      const link = document.createElement('a');
      link.href = base64;
      link.setAttribute('download', 'csv.pdf'); //or any other extension
      document.body.appendChild(link);
      link.click();
    };
    reader.readAsDataURL(csv);
  }

  const handleClose = () =>{
    setOpen(false);
  }

  const handleUpload = () => {
    var reader = new FileReader();
    reader.onloadend = function (evt) {
      console.log(evt);
      let base64 = reader.result;
      let objbase64 = Buffer.from(base64).toString("base64");
      register_new_test_csv({ csv: objbase64 }).then(data =>{
        if(data.result === "okay"){
          setOpen(true);
        }
      });
    };
    reader.readAsDataURL(csv);
  }

  return (
    <Grid
      sx={{ height: "100vh", marginLeft: "250px", px: "100px", py: "50px" }}
    >
      <Breadcrumbs separator="›" aria-label="breadcrumb" mb={6}>
        {breadcrumbs}
      </Breadcrumbs>
      <h1>Register new test"</h1>
      <Grid item container direction="row" spacing={2} mt={5}>
        <Grid item md={6}>
          <Paper>
            <Grid container direction="column" rowSpacing={2} p={1}>
              <Grid item>
                <label style={{ color: primary.main }}>
                  UPLOAD CSV TO AUTOFILL
                </label>
              </Grid>
              <Grid item container direction="row" alignItems="center">
                <Grid item md={10}>
                  <FileUploader
                    handleChange={(e) => setCSV(e)}
                    name="file"
                    types={["csv"]}
                  />
                </Grid>
                {csv &&
                  <Grid item >
                    <IconButton>
                      <Close style={{ color: disable.main }} onClick={() => setCSV(null)} />
                    </IconButton>
                    <IconButton>
                      <Download style={{ color: primary.main }} onClick={() => handleDownload()} />
                    </IconButton>
                  </Grid>
                }
              </Grid>
              {csv &&
                <Grid
                  item
                  container
                  justifyContent="flex-end"
                  alignItems="flex-end"
                >
                  <Grid item>
                    <Button
                      style={{ backgroundColor: primary.main }}
                      onClick={() => handleUpload()}
                    >
                      <IconText
                        style={{ float: "right" }}
                        direcion="row-reverse"
                        color={white.main}
                        icon={ArrowForward}
                        text="UPLOAD"
                      />
                    </Button>
                  </Grid>
                </Grid>
              }
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Notification
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Regsisteration Success
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
