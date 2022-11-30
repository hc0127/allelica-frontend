export const setPatients = (data) => async (dispatch) => {
    dispatch({ type: "SET_PATIENTS", payload: data });
};

export const setPatient = (data) => async (dispatch) => {
    dispatch({ type: "SELECTED_PATIENT", payload: data });
};

export const setTrackings = (data) => async(dispatch) =>{
    dispatch({ type: "SET_TRACKINGS", payload: data });
}