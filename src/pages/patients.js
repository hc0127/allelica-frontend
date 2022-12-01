import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./../store/actions/patientAction";
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
  TextField,
  Chip,
  Paper,
} from "@mui/material";
import { Download, Upload, Pending } from "@mui/icons-material";
import { useTheme } from "@material-ui/styles";
import { ChipTextIcon, NavLink } from "./components";
import useApi from "../api/useApi";

const breadcrumbs = [
  <NavLink underline="hover" key="1" color="inherit" href="/">
    Home
  </NavLink>,
  <Typography key="2" color="black">
    Patients
  </Typography>,
];

const columns = [
  { id: "orderId", label: "Order Id", minWidth: 300 },
  { id: "orderDate", label: "Order Date", format: (value) => value.toLocaleString("en-US"), minWidth: 100 },
  { id: "fullname", label: "Full Name", minWidth: 100 },
  { id: "birth", label: "Date of birth", format: (value) => value.toLocaleString("en-US"), minWidth: 100 },
  { id: "consentform", label: "Consent form", minWidth: 120 },
  { id: "teststatus", label: "Test Status", minWidth: 120 },
  { id: "tags", label: "Tags", minWidth: 300 },
];

const tags = [];
tags["calculation error"] = "error";
tags["some data missing"] = "error";
tags["awaiting payment"] = "error";
tags["paid"] = "success";
tags["completed"] = "success";


export default function Patients(props) {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selOrder, setSelOrder] = React.useState("");

  const theme = useTheme();
  const primary = theme.palette.primary;
  const orange = theme.palette.orange;
  const disable = theme.palette.disable;

  const dispatch = useDispatch();
  const fileSelect = useRef(null);

  const {
    search_registered_test,
    get_patient_report,
    get_patient_consent,
    upload_patient_consent,
  } = useApi();

  useEffect(() => {
    search_registered_test({ orderId: "" }).then((res) => {
      dispatch(Actions.setPatients(res));
    });
  }, []);

  const { patients } = useSelector((state) => {
    return {
      patients: state.patient.patients,
    };
  });

  const handleConsentForm = (row) => {
    if (row.patientConsentBoolean) {//download
      get_patient_consent({ orderId: row.orderId }).then((res) => { });
    } else {//upload
      setSelOrder(row.orderId);
      fileSelect.current.click();
    }
  };

  const handleTestStatus = (row) => {
    if (row.reportDocumentBoolean) {//download
      get_patient_report({ orderId: row.orderId })
        .then((res) => { });
    }
  }

  const handleSearch = (e) => {
    search_registered_test({ orderId: e.target.value }).then((res) => {
      dispatch(Actions.setPatients(res));
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const onUploadConsent = (e) => {
    const doc = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      let base64 = reader.result;
      let objbase64 = Buffer.from(base64).toString("base64");
      upload_patient_consent({ orderId: selOrder, documentBase64: objbase64 });
    };
    reader.readAsDataURL(doc);
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid
      sx={{ height: "100vh", marginLeft: "250px", px: "100px", py: "50px" }}
    >
      <Breadcrumbs separator="›" aria-label="breadcrumb" mb={6}>
        {breadcrumbs}
      </Breadcrumbs>
      <h1>Patient List</h1>
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
      <Grid component={Paper} mt={5} elevation={3}>
        <input
          type="file"
          accept=".pdf"
          ref={fileSelect}
          style={{ display: "none" }}
          onChange={(e) => onUploadConsent(e)}
        />
        <TableContainer mt={2}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {patients
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((patient, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell>{patient.orderId}</TableCell>
                      <TableCell>{patient.date.toLocaleString()}</TableCell>
                      <TableCell>
                        {
                          <NavLink
                            to="patientcard"
                            onClick={() => dispatch(Actions.setPatient(patient))}
                            style={{
                              color: primary.main,
                              textDecoration: "none",
                            }}
                          >
                            {patient.patientFullName}
                          </NavLink>
                        }
                      </TableCell>
                      <TableCell>{patient.date.toLocaleString()}</TableCell>
                      <TableCell>
                        <ChipTextIcon
                          theme={
                            patient.patientConsentBoolean ? primary : orange
                          }
                          icon={
                            patient.patientConsentBoolean ? Download : Upload
                          }
                          text={
                            patient.patientConsentBoolean
                              ? "Download"
                              : "Upload"
                          }
                          onClick={() => handleConsentForm(patient)}
                        />
                      </TableCell>
                      <TableCell>
                        <ChipTextIcon
                          theme={
                            patient.reportDocumentBoolean ? primary : disable
                          }
                          icon={
                            patient.reportDocumentBoolean ? Download : Pending
                          }
                          text={
                            patient.reportDocumentBoolean
                              ? "Downalod"
                              : "Pending"
                          }
                          onClick={() => handleTestStatus(patient)}
                        />
                      </TableCell>
                      <TableCell>
                        {patient.tags && patient.tags.map((tag, index) => {
                          return (
                            <Chip
                              key={index}
                              label={tag}
                              color={tags[tag]}
                              variant="outlined"
                            />
                          )
                        })}
                      </TableCell>
                    </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={patients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </Grid>
  );
}
