import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./reducers/authReducer";
import PatientReducer from "./reducers/patientReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  patient: PatientReducer,
});

const middlewares = [thunk];

const devTools =
  process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : (a) => a;

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares), devTools)
);

export default store;
