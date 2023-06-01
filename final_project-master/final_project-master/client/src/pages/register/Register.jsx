import React, { useState } from "react";
import {
  Avatar,
  Button,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";

const RegisterForm = () => {
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

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      console.log(res);
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div>
      <Grid>
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AddCircleIcon />
            </Avatar>
            <h2>Register</h2>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              style={fieldStyle}
              label="Username"
              placeholder="Enter username"
              fullWidth
              required
              onChange={(e) => setUsername(e.target.value)}
              type="text"
            />

            <TextField
              style={fieldStyle}
              label="Email Address"
              placeholder="Enter email"
              fullWidth
              required
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />

            <TextField
              style={fieldStyle}
              label="Password"
              placeholder="Enter password"
              type="password"
              fullWidth
              required
              onChange={(e) => setPassword(e.target.value)}
              type="text"
            />

            <FormControlLabel
              control={<Checkbox name="checkedB" color="default" />}
              label="Agree to Terms and Conditions"
            />

            <Button
              style={buttonStyle}
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
            >
              Register
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default RegisterForm;
