import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./../store/actions/patientAction";
import PropTypes from "prop-types";
import {
  Grid,
  Breadcrumbs,
  Typography,
  Paper,
  Button,
  IconButton 
} from "@mui/material";

import {
  Download,
  Close,
  ArrowForward,
} from "@mui/icons-material";
import { IconText, NavLink } from "./components";
import { FileUploader } from "react-drag-drop-files";

import { useTheme, makeStyles } from "@material-ui/styles";

import useApi from "../api/useApi";
import useAxiosConfig from "../api/useAxiosConfig";

const breadcrumbs = [
  <NavLink underline="hover" key="1" color="inherit" href="/">
    Home
  </NavLink>,
  <Typography key="2" color="black">
    Register
  </Typography>,
];

const useStyles = makeStyles((theme) => ({
  NavLink: {
    textDecoration: "none",
    color: "white",
    textColor: "white",
  },
}));

export default function RegisterCSV(props) {
  const theme = useTheme();
  const primary = theme.palette.primary;
  const disable = theme.palette.disable;
  const white = theme.palette.white;
  const dispatch = useDispatch();

  const [csv, setCSV] = React.useState(null);

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

  const handleUpload = () => {
  }

  return (
    <Grid
      direction="column"
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
                    types={["PDF"]}
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
    </Grid>
  );
}
