import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions/patientAction";
import {
  Grid,
  Breadcrumbs,
  Typography,
  Paper,
  InputLabel,
} from "@mui/material";
import {
  ArrowBack,
  Person,
  AddBox,
  FileCopy,
  Science,
  Download,
  Close,
  SyncAlt,
  Pending,
} from "@mui/icons-material";
import { useTheme } from "@material-ui/styles";
import { IconText, ChipTextIcon, NavLink } from "./components";
import useApi from "../api/useApi";

const breadcrumbs = [
  <NavLink key="1" to="/">
    Home
  </NavLink>,
  <NavLink key="2" to="/patients">
    Patients
  </NavLink>,
  <Typography key="3">Patient Card</Typography>,
];

const PRS = [];
PRS["BC"] = "Breast Cancer";
PRS["PC"] = "Prostate Cancer";
PRS["CAD"] = "Cornary Artery Disease";
PRS["T2D"] = "Type2 Diabetes";
PRS["AD"] = "Alzhemer Desease";

const gender = [];
gender["M"] = "MALE";
gender["F"] = "FEMALE";
gender["I"] = "INTERSEX";
gender["O"] = "OTHER";

const ethnicity = [];
ethnicity["SO"] = "SOUTH ASIAN";
ethnicity["EA"] = "EAST ASIAN";
ethnicity["PI"] = "PACIFIC ISLANDER";
ethnicity["BA"] = "BLACK AMERICAN";
ethnicity["NA"] = "NATIVE AMERICAN";
ethnicity["AJ"] = "ASHKENAZI JEWISH";
ethnicity["WC"] = "WHITE CAUCASIAN";
ethnicity["HL"] = "HISPANIC LATINO";

const answer = [];
answer["Y"] = "Yes";
answer["N"] = "No";
answer["O"] = "Unknown";

function PatientCard(props) {
  const theme = useTheme();
  const primary = theme.palette.primary;
  const disable = theme.palette.disable;
  const [patientInfo, setPatientInfo] = React.useState({});
  const [orders, setOrder] = React.useState([]);
  const {
    search_registered_test,
    get_patient_info,
    get_patient_report,
    get_patient_consent,
  } = useApi();

  const { patientId } = useSelector((state) => {
    return {
      patientId: state.patient.patientId,
    };
  });

  useEffect(() => {
    let patient = {};
    if (patientId) {
      search_registered_test({ patientId: patientId })
        .then((res1) => {
          get_patient_info({ patientId: patientId })
            .then((res2) => {
              patient = { ...res1[0], ...res2 };
              setPatientInfo(patient);
              setOrder(res1);
            });
        });
    }
  }, []);

  const handleReportDownload = (order) => {
    get_patient_report({ orderId: order.orderId }).then((res) => { });
  }
  const handleReportPending = () => {

  }
  const handleConsentDownload = (order) => {
    get_patient_consent({ orderId: order.orderId }).then((res) => { });
  }

  return (
    <Grid
      sx={{
        height: "100vh",
        marginLeft: "250px",
        px: "100px",
        py: "50px",
      }}
    >
      <Breadcrumbs separator="›" aria-label="breadcrumb" mb={6}>
        {breadcrumbs}
      </Breadcrumbs>
      <h1>Patient Card</h1>
      <NavLink to="/patients" style={{ color: primary.main }} mt={5}>
        <Grid container directon="row">
          <Grid item>
            <ArrowBack />
          </Grid>
          <Grid item pt={0.3}>
            <label>Go back to Patient list</label>
          </Grid>
        </Grid>
      </NavLink>
      <Grid container justifyContent="center" direction="row" m={1} spacing={1}>
        <Grid
          item
          container
          md={8}
          direction="column"
          justifyContent="center"
          spacing={2}
        >
          <Grid item>
            <Paper elevation={3}>
              <Grid p={2}>
                <IconText
                  color={primary.main}
                  direction="row"
                  icon={Person}
                  text={"Patient Information"}
                />
                <Grid container spacing={2} ml={1} mt={1}>
                  <Grid item md={4}>
                    <InputLabel>Full name</InputLabel>
                    <InputLabel style={{ color: "black" }}>
                      {patientInfo.patientFullName}
                    </InputLabel>
                  </Grid>
                  <Grid item md={4}>
                    <InputLabel>Date of birth</InputLabel>
                    <InputLabel style={{ color: "black" }}>
                      {patientInfo.date}
                    </InputLabel>
                  </Grid>
                  <Grid item md={4}>
                    <InputLabel>Phone number</InputLabel>
                    <InputLabel style={{ color: "black" }}>
                      {patientInfo.phoneNumber}
                    </InputLabel>
                  </Grid>
                  <Grid item md={4}>
                    <InputLabel>Email address</InputLabel>
                    <InputLabel style={{ color: "black" }}>
                      {patientInfo.emailAddress}
                    </InputLabel>
                  </Grid>
                  <Grid item md={4}>
                    <InputLabel>Sex assigned at birth</InputLabel>
                    <InputLabel style={{ color: "black" }}>
                      {gender[patientInfo.sex]}
                    </InputLabel>
                  </Grid>
                  <Grid item md={4}>
                    <InputLabel>Ethnicity</InputLabel>
                    <InputLabel style={{ color: "black" }}>
                      {ethnicity[patientInfo.ethnicity]}
                    </InputLabel>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={3}>
              <Grid p={2}>
                <IconText
                  color={primary.main}
                  icon={AddBox}
                  direction="row"
                  text="Clinical Information"
                />
                <Grid container spacing={2} ml={1} mt={1}>
                  <Grid item xs={4}>
                    <InputLabel>Family History</InputLabel>
                    <InputLabel style={{ color: "black" }}>
                      {patientInfo.familyHistory && patientInfo.familyHistory.map(history => {
                        return PRS[history] + "\t"
                      })}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel>Lipid values(mg/dL)</InputLabel>
                    <InputLabel style={{ color: "black" }}>
                      {patientInfo.lipid}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel>Systolic Blood Pressure(mmHg)</InputLabel>
                    <InputLabel style={{ color: "black" }}>
                      {patientInfo.SBP}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel>BMI</InputLabel>
                    <InputLabel style={{ color: "black" }}>
                      {patientInfo.BMI}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel>Height(ft,in)</InputLabel>
                    <InputLabel style={{ color: "black" }}>
                      {patientInfo.height}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel>Weight(lb)</InputLabel>
                    <InputLabel style={{ color: "black" }}>
                      {patientInfo.weight}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel>Smoker</InputLabel>
                    <InputLabel style={{ color: "black" }}>
                      {answer[patientInfo.smoke]}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel>Type 2 Diabetes</InputLabel>
                    <InputLabel style={{ color: "black" }}>
                      {answer[patientInfo.T2D]}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel>Myocardial Infarction</InputLabel>
                    <InputLabel style={{ color: "black" }}>
                      {answer[patientInfo.myocardialInfarction]}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel>Angina</InputLabel>
                    <InputLabel style={{ color: "black" }}>
                      {answer[patientInfo.angina]}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel>Statin prescription</InputLabel>
                    <InputLabel style={{ color: "black" }}>
                      {answer[patientInfo.statinPrescription]}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel>Benign biopsy(breast)</InputLabel>
                    <InputLabel style={{ color: "black" }}>
                      {answer[patientInfo.benignBiopsy]}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel>Hyperplasia(breast)</InputLabel>
                    <InputLabel style={{ color: "black" }}>
                      {answer[patientInfo.hyperplasia]}
                    </InputLabel>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid item container direction="column" md={4} spacing={2}>
          {patientInfo.patientConsentBoolean &&
            <Grid item>
              <Paper elevation={3}>
                <Grid
                  container
                  spacing={2}
                  ml={1}
                  mt={1}
                  p={2}
                  direction="column"
                  justifyContent="center"
                >
                  <IconText
                    color={primary.main}
                    direction="row"
                    icon={FileCopy}
                    text={"Uploaded files"}
                  />
                  <Grid item container direction="row" alignItems="center">
                    <Grid item container direction="column" xs={8}>
                      <Grid item>
                        <InputLabel>ConsentForm</InputLabel>
                      </Grid>
                      <Grid item container direction="row" spacing={2}>
                        <Grid item>
                          <InputLabel>100kb</InputLabel>
                        </Grid>
                        <Grid item>
                          <InputLabel>completed</InputLabel>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Download style={{ color: primary.main }} onClick={() => handleConsentDownload(patientInfo)} />
                    </Grid>
                    <Grid item>
                      <Close style={{ color: primary.main }} />
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          }
          <Grid item>
            <Paper elevation={3}>
              <Grid p={2}>
                <IconText
                  color={primary.main}
                  direction="row"
                  icon={Science}
                  text="Results"
                />
                <Grid
                  container
                  spacing={2}
                  ml={1}
                  mt={1}
                  direction="column"
                  justifyContent="center"
                >
                  {orders.map((order, oindex) => {
                    return (
                      <Grid
                        item
                        container
                        key={oindex}
                        direction="column"
                        alignItems="center"
                      >
                        <Grid item container direction="row" spacing={2}>
                          <Grid item md={8}>
                            {order.PRS.map((prsitem) => {
                              return (
                                <InputLabel>
                                  {PRS[prsitem]}
                                </InputLabel>
                              )
                            })}
                          </Grid>
                          <Grid item md={4}>
                            <InputLabel>{order.date}</InputLabel>
                          </Grid>
                          <Grid item container direction="row" spacing={2}>
                            {order.reportDocumentBoolean === true ? (
                              <>
                                <Grid item>
                                  <ChipTextIcon
                                    theme={primary}
                                    icon={Download}
                                    text="download"
                                    onClick={() => handleReportDownload(order)}
                                  />
                                </Grid>
                                {/* <Grid item>
                                <ChipTextIcon
                                  theme={primary}
                                  icon={SyncAlt}
                                  text="reinterept"
                                />
                              </Grid> */}
                              </>
                            ) : (
                              <Grid item>
                                <ChipTextIcon
                                  theme={disable}
                                  icon={Pending}
                                  text="pending"
                                  onClick={() => handleReportPending()}
                                />
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    )
                  })}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PatientCard;
