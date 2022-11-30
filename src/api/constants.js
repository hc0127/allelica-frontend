const BASIC_REST = "";

const REGISTER_NEW_TEST = {
  url: BASIC_REST + "/registerNewTest",
  method: "post",
};
const SEARCH_REGISTERED_TEST = {
  url: BASIC_REST + "/searchRegisteredTest",
  method: "get",
};
const UPLOAD_PATIENT_CONSENT = {
  url: BASIC_REST + "/uploadTestPatientConsent",
  method: "post",
};
const GET_PATIENT_REPORT = {
  url: BASIC_REST + "/getTestPatientReport",
  method: "get",
};
const GET_PATIENT_CONSENT = {
  url: BASIC_REST + "/getTestPatientConsent",
  method: "get",
};

const GET_TRACKING_INFO = {
  url: BASIC_REST + "/getTrackingInfo",
  method: "get",
};

const GET_PATIENT_INFO = {
  url: BASIC_REST + "/getPatientInfo",
  method: "get",
};

const GET_USER_INFO = {
  url: BASIC_REST + "/getUserInfo",
  method: "get",
}

export {
  REGISTER_NEW_TEST,
  SEARCH_REGISTERED_TEST,
  UPLOAD_PATIENT_CONSENT,
  GET_PATIENT_CONSENT,
  GET_PATIENT_REPORT,
  GET_TRACKING_INFO,
  GET_PATIENT_INFO,
  GET_USER_INFO,
};
