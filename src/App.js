import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Login from "./pages/login";
import Layout from "./layout";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { Provider } from "react-redux";
import store from "./store";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4639CA",
      light: "#ecebfa",
    },
    secondary: {
      main: "#00ff80",
      light: "#99ffcc"
    },
    orange: {
      main: "#fa6800",
      light: "#fff0e6",
    },
    disable: {
      main: "#888888",
      light: "#f2f2f2",
    },
    white:{
      main:"#ffffff",
      light:"#dddddd"
    }
  }
});

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Layout />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default withAuthenticationRequired(App);