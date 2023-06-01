import axios from "axios";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import React from "react";
import { Avatar, Button, FormControlLabel, Grid, Paper, TextField } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Checkbox from "@material-ui/core/Checkbox";

export default function Login() {
  const paperStyle = {
    padding: 20,
    height: "60vh",
    width: 400,
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#ffad06" };
  const buttonStyle = {
    margin: "20px 0px",
    height: "50px",
    borderRadius: "5px",
    backgroundColor: "#ffad06",
  };
  const fieldStyle = { margin: "5px 0px" };
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <Grid>
      <Paper style={paperStyle} >
        <Grid align="center">
          <Avatar style={avatarStyle}><AccountCircleIcon /></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <form className="loginForm" onSubmit={handleSubmit}>
          <TextField style={fieldStyle} label="Username" placeholder="Enter username" inputRef={userRef} fullWidth required />
          <TextField style={fieldStyle} label="Password" placeholder="Enter password" inputRef={passwordRef} type="password" fullWidth required />
          <FormControlLabel
            control={
              <Checkbox name="checkedB" color="default" />
            }
            label="Remember me"
          />
          <Button style={buttonStyle} type="submit" color="primary" variant="contained" disabled={isFetching} fullWidth>
            Sign In
          </Button>
        </form>
      </Paper>
    </Grid>

  );
}
