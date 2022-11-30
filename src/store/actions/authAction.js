export const setAuthenticatedUserData = (data) => async (dispatch) => {
  dispatch({ type: "SET_AUTH_USER", payload: data });
};