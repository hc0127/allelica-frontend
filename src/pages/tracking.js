import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions/patientAction";
import PropTypes from "prop-types";
import {
  Grid,
  Breadcrumbs,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Paper,
  Stepper,
  Step,
  StepLabel,
  TextField,
} from "@mui/material";
import useApi from "../api/useApi";
import { useTheme } from "@material-ui/styles";

import { NavLink } from "./components";

const breadcrumbs = [
  <NavLink underline="hover" key="1" color="inherit" href="/">
    Home
  </NavLink>,
  <NavLink underline="hover" key="2" color="inherit" href="/">
    Predict
  </NavLink>,
  <Typography key="3" color="black">
    Tracking
  </Typography>,
];

const columns = [
  { id: "orderId", label: "Order Id", maxWidth: 100 },
  { id: "name", label: "Full Name", maxWidth: 100 },
  { id: "message", label: "Order Status" },
];


export default function TrackingList(props) {
  TrackingList.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const theme = useTheme();
  const primary = theme.palette.primary;

  const dispatch = useDispatch();

  const { get_tracking_info } = useApi();

  useEffect(() => {
    get_tracking_info({ orderId: "" }).then((res) => {
      dispatch(Actions.setTrackings(res));
    });
  }, []);

  const { trackings } = useSelector((state) => {
    return {
      trackings: state.patient.trackings,
    };
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (e) => {
    get_tracking_info({ orderId: e.target.value }).then((res) => {
      dispatch(Actions.setTrackings(res));
    });
  };

  const steps = ["", "", "", "", "", ""];

  return (
    <Grid
      sx={{ height: "100vh", marginLeft: "250px", px: "100px", py: "50px" }}
    >
      <Breadcrumbs separator="›" aria-label="breadcrumb" mb={6}>
        {breadcrumbs}
      </Breadcrumbs>
      <h1>Tracking List</h1>
      <Grid
        container
        alignItems="right"
        justifyContent="flex-end"
        direction="row"
        mt={5}
      >
        <TextField
          id="filled-basic"
          label="Search by barcode/name"
          onChange={(e) => handleSearch(e)}
          size="small"
          variant="standard"
        />
      </Grid>
      <Grid component={Paper} mt={5}>
        <TableContainer mt={2}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {trackings
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((tracking, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell>{tracking.orderId}</TableCell>
                      <TableCell>{tracking.orderId}</TableCell>
                      <TableCell>
                        <Stepper
                          activeStep={tracking.statusId - 1}
                          alternativeLabel
                        >
                          {steps.map((label) => (
                            <Step key={label}>
                              <StepLabel style={{ color: primary.main }}>
                                {index + 1 === tracking.statusId
                                  ? tracking.message
                                  : ""}
                              </StepLabel>
                            </Step>
                          ))}
                        </Stepper>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={trackings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </Grid>
  );
}
