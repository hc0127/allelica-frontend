import React from "react";
import { useState } from "react";

import {
  Grid,
  Button,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import { useTheme, makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  logo: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  textfield: {
    borderColor: "pink",
    borderWidth: 1,
  },
}));

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const theme = useTheme();
  const classes = useStyles();

  const handleLogin = () => {
  };

  const valueChange = (target, e) => {
    setData({ ...data, [target]: e.target.value });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="row"
      height={"100%"}
    >
      <Grid item md={3}>
        <img alt="complex" className={classes.logo} src="logo.png" />
        <Grid
          item
          xs={12}
          sm={8}
          md={12}
          mt={3}
          p={2}
          component={Paper}
          elevation={1}
          square
        >
          <div className="border">
            <form noValidate>
              <TextField
                id="username"
                label="Username"
                name="username"
                onChange={(e) => valueChange("email", e)}
                value={data.email}
                className="bg-violet-500"
                variant="outlined"
                style={{ borderColor: theme.palette.primary.main }}
                InputProps={{
                  classes: { notchedOutline: classes.textfield },
                }}
                margin="normal"
                required
                fullWidth
                autoFocus
              />
              <TextField
                onChange={(e) => valueChange("password", e)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                style={{ color: theme.palette.primary.main }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    style={{ color: theme.palette.primary.main }}
                  />
                }
                label="Remember me"
              />
              <Button
                onClick={() => handleLogin()}
                type="button"
                fullWidth
                variant="contained"
                style={{ backgroundColor: theme.palette.primary.main }}
              >
                LOGIN
              </Button>
              <Grid container mt={3}>
                <Grid item>
                  <label>
                    Don't have an account?
                    <Link
                      href="#"
                      variant="body2"
                      style={{ color: theme.palette.primary.main }}
                    >
                      {"Contact us"}
                    </Link>
                  </label>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
