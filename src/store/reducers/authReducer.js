const initialState = {
    authenticated: false,
    user: null,
  };
  
  const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_AUTH_USER":
        return { ...state, user: action.payload, authenticated: true };
      default:
        return state;
    }
  };
  
  export default AuthReducer;
  