const initialState = {
    patients:[],
    trackings:[],
    patientId:"",
    orderId:"",
  };
  
  const PatientReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_PATIENTS":
        return { ...state, patients: action.payload };
      case "SELECTED_PATIENT":
        console.log(action.payload)
        return { ...state,
          orderId: action.payload.orderId,
          patientId: action.payload.patientId,
        };
      case "SET_TRACKINGS":
        return { ...state, trackings: [{...action.payload}] };
      default:
        return state;
    }
  };
  
  export default PatientReducer;