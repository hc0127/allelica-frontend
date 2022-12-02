import React from "react";
import {
	Grid,
	Breadcrumbs,
	Typography,
	Step,
	Stepper,
	StepLabel,
	Paper,
	Button,
	TextField,
	InputLabel,
	FormLabel,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Checkbox,
	IconButton,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import {
	ArrowBack,
	ArrowForward,
	CheckCircleOutline,
	CheckCircle,
	Close,
	Download,
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

export default function RegisterFill(props) {
	const theme = useTheme();
	const primary = theme.palette.primary;
	const disable = theme.palette.disable;
	const white = theme.palette.white;

	const [open, setOpen] = React.useState(false);
	const [consentForm, setConsentForm] = React.useState(null);
	const [activeStep, setActiveStep] = React.useState(1);
	const [registered, setRegister] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [requiredValue, setRequired] = React.useState(false);
	const [requiredPRS, setRequiredPRS] = React.useState(false);
	const [requiredEmail, setRequiredEmail] = React.useState(false);
	const [registerCommon, setRegisterCommon] = React.useState({
		patientAddress: "",//step1
		patientFullName: "",
		patientBirthdate: "2000-01-01",
		emailAddress: "",
		phoneNumber: "",
		physicianFullName: "",
		physicianEmailAddress: "",
		barcode: "",
		note: "",

		sex: "O",//step2
		ethnicity: "O",

		familyHistory: [],//step3
		HDLC: 0,
		LDLC: 0,
		TOTC: 0,
		SBP: 0,
		BMI: 0,
		height: 0,
		weight: 0,

		smoke: "O",//step4
		T2D: "O",
		myocardialInfarction: "O",
		angina: "O",
		statinPrescription: "O",
		benignBiopsy: "O",
		hyperplasia: "O",
		ageFirstChild: 0,
		numberOfChildren: 0,
		ageMenarche: 0,
		ageMenopause: 0,

		patientConsent: "",//step5

		PRS: [],//step6
		shipsTo: "",
		shipsToAddress: "",
	});

	const {
		register_new_test,
	} = useApi();

	const steps = [
		"Patient information",
		"Clinical information",
		"patient Consent Form",
		"Test information",
	];
	const stepNums = [0, 0, 0, 1, 1, 2, 3];

	const handleDownload = () => {
		var reader = new FileReader();
		reader.onloadend = function () {
			let base64 = reader.result;
			const link = document.createElement('a');
			link.href = base64;
			link.setAttribute('download', 'consentForm.pdf'); //or any other extension
			document.body.appendChild(link);
			link.click();
		};
		reader.readAsDataURL(consentForm);
	}

	const validateEmail = (email) => {
		return email.toLowerCase().match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
	};
	const setCheckEmail = (item, value) => {
		if (validateEmail(value) == null) {
			setRequiredEmail(true);
		} else {
			setRequiredEmail(false);
		}
		setRegisterCommon({ ...registerCommon, [item]: value });
	}

	const handleClose = () =>{
		setOpen(false);
	}

	if (activeStep === 7) {
		if (!registerCommon.patientFullName || !registerCommon.phoneNumber || !registerCommon.physicianFullName || validateEmail(registerCommon.emailAddress) == null) {
			setActiveStep(1);
			setRequired(true);
			if (validateEmail(registerCommon.emailAddress) == null) {
				setRequiredEmail(true);
			}
		} else if (registerCommon.PRS.length === 0) {
			setActiveStep(6);
			setRequiredPRS(true);
		} else {
			setLoading(true);
			if (consentForm) {
				var reader = new FileReader();
				reader.onloadend = function () {
					let base64 = reader.result;
					let objbase64 = Buffer.from(base64).toString("base64");
					register_new_test({ ...registerCommon, patientConsent: objbase64 }).then(data =>{
						if(data.result !== "okay"){
							setOpen(true);
						}else{
							setRegister(true);
						}
					});
				};
				reader.readAsDataURL(consentForm);
			} else {
				register_new_test(registerCommon).then(data =>{
					if(data.result !== "okay"){
						setOpen(true);
					}else{
						setRegister(true);
					}
				});
			}
			setActiveStep(6);
			setLoading(false);
		}
	}

	const setCheckedState = (item, value) => {
		let tmp = registerCommon[item];
		if (tmp.includes(value)) {
			tmp = tmp.filter(item => item !== value);
		} else {
			tmp.push(value);
		}
		setRegisterCommon({ ...registerCommon, [item]: tmp });
	}

	function renderStep(param) {
		switch (param) {
			case 1:
				return (<>
					<Grid item>
						<label style={{ color: primary.main }}>
							PATIENT INFORMATION
						</label>
					</Grid>
					<Grid item container spacing={2}>
						<Grid item md={12}>
							<p>Please complete this field if you and/or your organization is managing return shipping to the Allelica service laboratory.</p>
							<p>If Allelica is managing your testing logistic, please disregard this field</p>
						</Grid>
						<Grid item md={12}>
							<TextField
								fullWidth
								label="Patient address"
								variant="outlined"
								value={registerCommon.patientAddress}
								onChange={(e) => setRegisterCommon({ ...registerCommon, patientAddress: e.target.value })}
							/>
						</Grid>
						<Grid item md={6}>
							<TextField
								fullWidth
								required
								label="Patient full name"
								variant="outlined"
								error={(!registerCommon.patientFullName && requiredValue) ? true : false}
								value={registerCommon.patientFullName}
								onChange={(e) => setRegisterCommon({ ...registerCommon, patientFullName: e.target.value })}
							/>
						</Grid>
						<Grid item md={6}>
							<TextField
								fullWidth
								type="date"
								label="Patient date of birth(MM/DD/YYYY)"
								variant="outlined"
								value={registerCommon.patientBirthdate}
								onChange={(e) => setRegisterCommon({ ...registerCommon, patientBirthdate: e.target.value })}
							/>

						</Grid>
						<Grid item md={6}>
							<TextField
								fullWidth
								label="Email address"
								type="email"
								error={requiredEmail ? true : false}
								required
								variant="outlined"
								value={registerCommon.emailAddress}
								onChange={(e) => setCheckEmail('emailAddress', e.target.value)}
							/>
						</Grid>
						<Grid item md={6}>
							<TextField
								fullWidth
								required
								label="Phone number"
								variant="outlined"
								error={(!registerCommon.phoneNumber && requiredValue) ? true : false}
								value={registerCommon.phoneNumber}
								onChange={(e) => setRegisterCommon({ ...registerCommon, phoneNumber: e.target.value })}
							/>
						</Grid>
						<Grid item md={6}>
							<TextField
								fullWidth
								required
								label="Physician full name"
								variant="outlined"
								error={(!registerCommon.physicianFullName && requiredValue) ? true : false}
								value={registerCommon.physicianFullName}
								onChange={(e) => setRegisterCommon({ ...registerCommon, physicianFullName: e.target.value })}
							/>
						</Grid>
						<Grid item md={6}>
							<TextField
								fullWidth
								label="Physician email address"
								variant="outlined"
								value={registerCommon.physicianEmailAddress}
								onChange={(e) => setRegisterCommon({ ...registerCommon, physicianEmailAddress: e.target.value })}
							/>
						</Grid>
						<Grid item md={12}>
							<p>If Allelica is shipping the test directly to the patient's home, you may leave this field blank.Your patinet will be responsible for recording the barcode on the patient Consent Form</p>
						</Grid>
						<Grid item md={12}>
							<TextField
								fullWidth
								label="Barcode(printed on the DNA collector,begining with GFX)" variant="outlined"
								value={registerCommon.barcode}
								onChange={(e) => setRegisterCommon({ ...registerCommon, barcode: e.target.value })}
							/>
						</Grid>
						<Grid item md={12}>
							<TextField
								fullWidth
								label="Note"
								variant="outlined"
								value={registerCommon.note}
								onChange={(e) => setRegisterCommon({ ...registerCommon, note: e.target.value })}
							/>
						</Grid>
					</Grid>
				</>);
			case 2:
				return (
					<>
						<Grid item>
							<label style={{ color: primary.main }}>
								PATIENT INFORMATION
							</label>
						</Grid>
						<Grid item container spacing={2}>
							<Grid item>
								<FormControl>
									<FormLabel id="demo-radio-sex-group-label">Sex assigned at birth</FormLabel>
									<RadioGroup
										aria-labelledby="demo-radio-sex-group-label"
										name="radio-buttons-group"
										row
										value={registerCommon.sex}
										onChange={(e) => setRegisterCommon({ ...registerCommon, sex: e.target.value })}
									>
										<FormControlLabel value="M" control={<Radio style={{ color: primary.main }} />} label="Male" />
										<FormControlLabel value="F" control={<Radio style={{ color: primary.main }} />} label="Female" />
										<FormControlLabel value="I" control={<Radio style={{ color: primary.main }} />} label="Intersex" />
										<FormControlLabel value="O" control={<Radio style={{ color: primary.main }} />} label="Other" />
									</RadioGroup>
								</FormControl>
							</Grid>
							<Grid item>
								<FormControl>
									<FormLabel id="demo-radio-ethnicity-group-label">Ethnicity</FormLabel>
									<RadioGroup
										aria-labelledby="demo-radio-ethnicity-group-label"
										defaultValue="SO"
										name="radio-buttons-group"
										row
										value={registerCommon.ethnicity}
										onChange={(e) => setRegisterCommon({ ...registerCommon, ethnicity: e.target.value })}
									>
										<FormControlLabel value="SO" control={<Radio style={{ color: primary.main }} />} label="South Asian" />
										<FormControlLabel value="EA" control={<Radio style={{ color: primary.main }} />} label="East Asian" />
										<FormControlLabel value="PI" control={<Radio style={{ color: primary.main }} />} label="Pacific Islander" />
										<FormControlLabel value="BA" control={<Radio style={{ color: primary.main }} />} label="Black American" />
										<FormControlLabel value="NA" control={<Radio style={{ color: primary.main }} />} label="Native American" />
										<FormControlLabel value="AJ" control={<Radio style={{ color: primary.main }} />} label="Ashkenazi Jewish" />
										<FormControlLabel value="WC" control={<Radio style={{ color: primary.main }} />} label="White Caucasian" />
										<FormControlLabel value="HL" control={<Radio style={{ color: primary.main }} />} label="Hispanic Latino" />
										<FormControlLabel value="O" control={<Radio style={{ color: primary.main }} />} label="Other" />
									</RadioGroup>
								</FormControl>
							</Grid>
						</Grid>
					</>);
			case 3:
				return (<>
					<Grid item>
						<label style={{ color: primary.main }}>
							CLINICAL INFORMATION
						</label>
					</Grid>
					<Grid item container spacing={2}>
						<Grid item md={12}>
							<InputLabel>Family History</InputLabel>
						</Grid>
						<Grid item md={12}>
							<FormControlLabel
								control={
									<Checkbox
										style={{ color: primary.main }}
										checked={registerCommon.familyHistory.includes('BC')}
										onChange={(e) => setCheckedState('familyHistory', 'BC')}
									/>
								}
								label="Breast cancer"
							/>
							<FormControlLabel
								control={
									<Checkbox
										style={{ color: primary.main }}
										checked={registerCommon.familyHistory.includes('PC')}
										onChange={(e) => setCheckedState('familyHistory', 'PC')}
									/>
								}
								label="Prostate cancer"
							/>
							<FormControlLabel
								control={
									<Checkbox
										style={{ color: primary.main }}
										checked={registerCommon.familyHistory.includes('CAD')}
										onChange={(e) => setCheckedState('familyHistory', 'CAD')}
									/>
								}
								label="Cornary artery disease"
							/>
							<FormControlLabel
								control={
									<Checkbox
										style={{ color: primary.main }}
										checked={registerCommon.familyHistory.includes('T2D')}
										onChange={(e) => setCheckedState('familyHistory', 'T2D')}
									/>
								}
								label="Type 2 disease"
							/>
							<FormControlLabel
								control={
									<Checkbox
										style={{ color: primary.main }}
										checked={registerCommon.familyHistory.includes('AD')}
										onChange={(e) => setCheckedState('familyHistory', 'AD')}
									/>
								}
								label="Alzhemer's disease"
							/>
						</Grid>
						<Grid item md={4}>
							<TextField
								fullWidth
								type="number"
								label="Lipid values HDL-C(mg/dL)"
								variant="outlined"
								value={registerCommon.HDLC}
								onChange={(e) => setRegisterCommon({ ...registerCommon, HDLC: e.target.value })}
							/>
						</Grid>
						<Grid item md={4}>
							<TextField
								fullWidth
								type="number"
								label="Lipid values LDL-C(mg/dL)"
								variant="outlined"
								value={registerCommon.LDLC}
								onChange={(e) => setRegisterCommon({ ...registerCommon, LDLC: e.target.value })}
							/>
						</Grid>
						<Grid item md={4}>
							<TextField
								fullWidth
								type="number"
								label="Lipid values TOT-C(mg/dL)"
								variant="outlined"
								value={registerCommon.TOTC}
								onChange={(e) => setRegisterCommon({ ...registerCommon, TOTC: e.target.value })}
							/>
						</Grid>
						<Grid item md={6}>
							<TextField
								fullWidth
								type="number"
								label="Systolic blood pressure"
								variant="outlined"
								value={registerCommon.SBP}
								onChange={(e) => setRegisterCommon({ ...registerCommon, SBP: e.target.value })}
							/>
						</Grid>
						<Grid item md={6}>
							<TextField
								fullWidth
								type="number"
								label="BMI"
								variant="outlined"
								value={registerCommon.BMI}
								onChange={(e) => setRegisterCommon({ ...registerCommon, BMI: e.target.value })}
							/>
						</Grid>
						<Grid item md={6}>
							<TextField
								fullWidth
								type="number"
								label="Height(ft,in)"
								variant="outlined"
								value={registerCommon.height}
								onChange={(e) => setRegisterCommon({ ...registerCommon, height: e.target.value })}
							/>
						</Grid>
						<Grid item md={6}>
							<TextField
								fullWidth
								type="number"
								label="Wight(lb)"
								variant="outlined"
								value={registerCommon.weight}
								onChange={(e) => setRegisterCommon({ ...registerCommon, weight: e.target.value })}
							/>
						</Grid>
					</Grid>
				</>);
			case 4:
				return (
					<>
						<Grid item>
							<label style={{ color: primary.main }}>
								CLINICAL INFORMATION
							</label>
						</Grid>
						<Grid item container spacing={2}>
							<Grid item md={12}>
								<FormControl>
									<FormLabel id="demo-radio-smoker-group-label">Smoker</FormLabel>
									<RadioGroup
										aria-labelledby="demo-radio-smoker-group-label"
										defaultValue="Y"
										name="radio-buttons-group"
										row
										value={registerCommon.smoke}
										onChange={(e) => setRegisterCommon({ ...registerCommon, smoke: e.target.value })}
									>
										<FormControlLabel value="Y" control={<Radio style={{ color: primary.main }} />} label="Yes" />
										<FormControlLabel value="N" control={<Radio style={{ color: primary.main }} />} label="No" />
										<FormControlLabel value="O" control={<Radio style={{ color: primary.main }} />} label="Unknown" />
									</RadioGroup>
								</FormControl>
							</Grid>
							<Grid item md={12}>
								<FormControl>
									<FormLabel id="demo-radio-t2d-group-label">Type 2 Diabetes</FormLabel>
									<RadioGroup
										aria-labelledby="demo-radio-t2d-group-label"
										defaultValue="Y"
										name="radio-buttons-group"
										row
										value={registerCommon.T2D}
										onChange={(e) => setRegisterCommon({ ...registerCommon, T2D: e.target.value })}
									>
										<FormControlLabel value="Y" control={<Radio style={{ color: primary.main }} />} label="Yes" />
										<FormControlLabel value="N" control={<Radio style={{ color: primary.main }} />} label="No" />
										<FormControlLabel value="O" control={<Radio style={{ color: primary.main }} />} label="Unknown" />
									</RadioGroup>
								</FormControl>
							</Grid>
							<Grid item md={12}>
								<FormControl>
									<FormLabel id="demo-radio-mi-group-label">Myocardial Infarction</FormLabel>
									<RadioGroup
										aria-labelledby="demo-radio-mi-group-label"
										defaultValue="Y"
										name="radio-buttons-group"
										row
										value={registerCommon.myocardialInfarction}
										onChange={(e) => setRegisterCommon({ ...registerCommon, myocardialInfarction: e.target.value })}
									>
										<FormControlLabel value="Y" control={<Radio style={{ color: primary.main }} />} label="Yes" />
										<FormControlLabel value="N" control={<Radio style={{ color: primary.main }} />} label="No" />
										<FormControlLabel value="O" control={<Radio style={{ color: primary.main }} />} label="Unknown" />
									</RadioGroup>
								</FormControl>
							</Grid>
							<Grid item md={12}>
								<FormControl>
									<FormLabel id="demo-radio-angina-group-label">Angina</FormLabel>
									<RadioGroup
										aria-labelledby="demo-radio-angina-group-label"
										defaultValue="Y"
										name="radio-buttons-group"
										row
										value={registerCommon.angina}
										onChange={(e) => setRegisterCommon({ ...registerCommon, angina: e.target.value })}
									>
										<FormControlLabel value="Y" control={<Radio style={{ color: primary.main }} />} label="Yes" />
										<FormControlLabel value="N" control={<Radio style={{ color: primary.main }} />} label="No" />
										<FormControlLabel value="O" control={<Radio style={{ color: primary.main }} />} label="Unknown" />
									</RadioGroup>
								</FormControl>
							</Grid>
							<Grid item md={12}>
								<FormControl>
									<FormLabel id="demo-radio-sp-group-label">Statin prescription</FormLabel>
									<RadioGroup
										aria-labelledby="demo-radio-sp-group-label"
										defaultValue="Y"
										name="radio-buttons-group"
										row
										value={registerCommon.statinPrescription}
										onChange={(e) => setRegisterCommon({ ...registerCommon, statinPrescription: e.target.value })}
									>
										<FormControlLabel value="Y" control={<Radio style={{ color: primary.main }} />} label="Yes" />
										<FormControlLabel value="N" control={<Radio style={{ color: primary.main }} />} label="No" />
										<FormControlLabel value="O" control={<Radio style={{ color: primary.main }} />} label="Unknown" />
									</RadioGroup>
								</FormControl>
							</Grid>
							<Grid item md={12}>
								<FormControl>
									<FormLabel id="demo-radio-bb-group-label">Benign biopsy</FormLabel>
									<RadioGroup
										aria-labelledby="demo-radio-bb-group-label"
										defaultValue="Y"
										name="radio-buttons-group"
										row
										value={registerCommon.benignBiopsy}
										onChange={(e) => setRegisterCommon({ ...registerCommon, benignBiopsy: e.target.value })}
									>
										<FormControlLabel value="Y" control={<Radio style={{ color: primary.main }} />} label="Yes" />
										<FormControlLabel value="N" control={<Radio style={{ color: primary.main }} />} label="No" />
										<FormControlLabel value="O" control={<Radio style={{ color: primary.main }} />} label="Unknown" />
									</RadioGroup>
								</FormControl>
							</Grid>
							<Grid item md={12}>
								<FormControl>
									<FormLabel id="demo-radio-hyperplasia-group-label">Hyperplasia</FormLabel>
									<RadioGroup
										aria-labelledby="demo-radio-hyperplasia-group-label"
										defaultValue="Y"
										name="radio-buttons-group"
										row
										value={registerCommon.hyperplasia}
										onChange={(e) => setRegisterCommon({ ...registerCommon, hyperplasia: e.target.value })}
									>
										<FormControlLabel value="Y" control={<Radio style={{ color: primary.main }} />} label="Yes" />
										<FormControlLabel value="N" control={<Radio style={{ color: primary.main }} />} label="No" />
										<FormControlLabel value="O" control={<Radio style={{ color: primary.main }} />} label="Unknown" />
									</RadioGroup>
								</FormControl>
							</Grid>
							<Grid item md={12}>
								<InputLabel>Following fields for females assigned at birth</InputLabel>
							</Grid>
							<Grid item md={3}>
								<TextField
									fullWidth
									type="number"
									label="Age at first child"
									variant="outlined"
									value={registerCommon.ageFirstChild}
									onChange={(e) => setRegisterCommon({ ...registerCommon, ageFirstChild: parseInt(e.target.value) })}
								/>
							</Grid>
							<Grid item md={3}>
								<TextField
									fullWidth
									type="number"
									label="Number of children"
									variant="outlined"
									value={registerCommon.numberOfChildren}
									onChange={(e) => setRegisterCommon({ ...registerCommon, numberOfChildren: parseInt(e.target.value) })}
								/>
							</Grid>
							<Grid item md={3}>
								<TextField
									fullWidth
									type="number"
									label="Age at menarche"
									variant="outlined"
									value={registerCommon.ageMenarche}
									onChange={(e) => setRegisterCommon({ ...registerCommon, ageMenarche: parseInt(e.target.value) })}
								/>
							</Grid>
							<Grid item md={3}>
								<TextField
									fullWidth
									type="number"
									label="Age at menopause"
									variant="outlined"
									value={registerCommon.ageMenopause}
									onChange={(e) => setRegisterCommon({ ...registerCommon, ageMenopause: parseInt(e.target.value) })}
								/>
							</Grid>
						</Grid>
					</>);
			case 5:
				return (<>
					<Grid item>
						<label style={{ color: primary.main }}>
							UPLOAD PATIENT CONSENT FORM AND OTHER FILES
						</label>
					</Grid>
					<Grid item container direction="row" alignItems="center">
						<Grid item md={10}>
							{consentForm &&
								<InputLabel>selected:{consentForm.name}</InputLabel>
							}
							<FileUploader
								handleChange={(e) => setConsentForm(e)}
								name="file"
								types={["PDF"]}
							/>
						</Grid>
						{consentForm &&
							<Grid item>
								<IconButton>
									<Close style={{ color: disable.main }} onClick={() => setConsentForm(null)} />
								</IconButton>
								<IconButton>
									<Download style={{ color: primary.main }} onClick={() => handleDownload()} />
								</IconButton>
							</Grid>
						}
					</Grid>
				</>);
			case 6:
				return (<>
					<Grid item>
						<label style={{ color: primary.main }}>
							TEST INFORMATION
						</label>
					</Grid>
					<Grid item container spacing={2}>
						<Grid item md={12}>
							<InputLabel style={{color:requiredPRS && "red"}}>PRS Selection</InputLabel>
						</Grid>
						<Grid item md={12}>
							<FormControlLabel
								control={
									<Checkbox
										style={{ color: primary.main }}
										checked={registerCommon.PRS.includes('BC')}
										onChange={(e) => setCheckedState('PRS', 'BC')}
									/>
								}
								label="Breast cancer" />
							<FormControlLabel
								control={
									<Checkbox
										style={{ color: primary.main }}
										checked={registerCommon.PRS.includes('PC')}
										onChange={(e) => setCheckedState('PRS', 'PC')}
									/>
								}
								label="Prostate cancer" />
							<FormControlLabel
								control={
									<Checkbox
										style={{ color: primary.main }}
										checked={registerCommon.PRS.includes('CAD')}
										onChange={(e) => setCheckedState('PRS', 'CAD')}
									/>
								}
								label="Cornary artery disease" />
							<FormControlLabel
								control={
									<Checkbox
										style={{ color: primary.main }}
										checked={registerCommon.PRS.includes('T2D')}
										onChange={(e) => setCheckedState('PRS', 'T2D')}
									/>
								}
								label="Type 2 disease" />
							<FormControlLabel
								control={
									<Checkbox
										style={{ color: primary.main }}
										checked={registerCommon.PRS.includes('AD')}
										onChange={(e) => setCheckedState('PRS', 'AD')}
									/>
								}
								label="Alzhemer's disease"
							/>
						</Grid>
						<Grid item>
							<FormControl>
								<FormLabel id="demo-radio-shipment-group-label">Shipment Information</FormLabel>
								<RadioGroup
									aria-labelledby="demo-radio-shipment-group-label"
									defaultValue="M"
									name="radio-buttons-group"
									row
									value={registerCommon.shipsTo}
									onChange={(e) => setRegisterCommon({ ...registerCommon, shipsTo: e.target.value })}
								>
									<FormControlLabel value="office" control={<Radio style={{ color: primary.main }} />} label="Ship kit to office/clinic" />
									<FormControlLabel value="patient" control={<Radio style={{ color: primary.main }} />} label="Ship kit to my patient's home" />
									<FormControlLabel value="studio" control={<Radio style={{ color: primary.main }} />} label="Kit is alreay available for use in my studio/clinic" />
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid item md={6}>
							<TextField
								fullWidth
								label="Address"
								variant="outlined"
								value={registerCommon.shipsToAddress}
								onChange={(e) => setRegisterCommon({ ...registerCommon, shipsToAddress: e.target.value })}
							/>
						</Grid>
					</Grid>
				</>);
			default:
				return null;
		}
	}

	return (
		<Grid
			sx={{ height: "100vh", marginLeft: "250px", px: "100px", py: "50px" }}
			justifyContent="flex-start"
			alignItems="center"
		>
			<Breadcrumbs separator="›" aria-label="breadcrumb" mb={6}>
				{breadcrumbs}
			</Breadcrumbs>
			<h1>
				{activeStep === 7 ? "The request was sent successfuly" : "Register new test"}
			</h1>
			{registered === true ? (
				<Grid
					container
					direction="column"
					justifyContent="flex-start"
					mt={5}
				>
					<Grid item>
						<Stepper activeStep={4} alternativeLabel>
							<Step>
								<StepLabel>Patient information</StepLabel>
							</Step>
							<Step>
								<StepLabel>Clinical information</StepLabel>
							</Step>
							<Step>
								<StepLabel>Patient Consent From</StepLabel>
							</Step>
							<Step>
								<StepLabel>Test information</StepLabel>
							</Step>
						</Stepper>
					</Grid>
					<Grid item>
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
					</Grid>
				</Grid>
			) : (
				<Grid item container direction="row" spacing={2} mt={5}>
					<Grid item md={9}>
						<Paper elevation={3}>
							<Grid container direction="column" rowSpacing={2} p={2}>
								{renderStep(activeStep)}
								<Grid
									item
									container
									justifyContent="flex-end"
									alignItems="flex-end"
									spacing={2}
								>
									<Grid item>
										<Button
											style={{ backgroundColor: disable.main }}
											disabled={activeStep === 1 && true}
											onClick={() => setActiveStep(activeStep - 1)}
										>
											<IconText
												style={{ float: "right" }}
												direcion="row-reverse"
												color={white.main}
												icon={ArrowBack}
												text="BACK"
											/>
										</Button>
									</Grid>
									<Grid item>
										<Button
											style={{ backgroundColor: primary.main }}
											onClick={() => setActiveStep(activeStep + 1)}
										>
											{activeStep === 6 ?
												<IconText
													style={{ float: "right" }}
													direcion="row-reverse"
													color={white.main}
													icon={loading ? CircularProgress : ArrowForward}
													text="REGISTER"
												/>
												:
												<IconText
													style={{ float: "right" }}
													direcion="row-reverse"
													color={white.main}
													icon={ArrowForward}
													text="CONTINUE"
												/>
											}
										</Button>
									</Grid>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid
						item
						container
						direction="column"
						justifyContent="flex-start"
						spacing={1}
						md={3}
					>
						{steps.map((step, index) => {
							return (
								<Grid item key={index}>
									<IconText
										color={primary.main}
										direction="row"
										icon={stepNums[activeStep] <= index ? CheckCircleOutline : CheckCircle}
										text={step}
									/>
								</Grid>
							);
						})}
					</Grid>
				</Grid>
			)}
			
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
					Regsisteration Error
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
