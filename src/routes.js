import React from "react";

const RegisterCSV = React.lazy(() => import("./pages/register_csv"));
const RegisterFill = React.lazy(() => import("./pages/register_fill"));
const Patients = React.lazy(() => import("./pages/patients"));
const PatientCard = React.lazy(() => import("./pages/patientcard"));
const TrackingList = React.lazy(() => import("./pages/tracking"));

const routes = [
  { path: "/", exact: true, name: "PatientList" },
  { path: "/register_csv", name: "Register", element: RegisterCSV },
  { path: "/register_fill", name: "Register", element: RegisterFill },
  { path: "/patients", name: "Patients", element: Patients },
  { path: "/patients/patientcard", name: "Patients", element: PatientCard },
  { path: "/tracking", name: "Tracking", element: TrackingList },
];

export default routes;
