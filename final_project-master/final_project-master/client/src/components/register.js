// import React from "react";
// import App from "../App";
// import { Avatar, Button, FormControlLabel, Grid, Link, Paper, TextField, Typography } from "@mui/material";
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import Checkbox from "@material-ui/core/Checkbox";
// const Register=()=> {

//     const paperStyle = {padding: 20, height: "60vh", width: 400, margin: "0 auto"}
//     const avatarStyle = {backgroundColor: "#ffad06"}
//     const buttonStyle = {margin: "20px 0px", height: "50px", borderRadius: "5px", backgroundColor: "#ffad06"}
//     const fieldStyle = {margin: "5px 0px"}
//     return(
//         <Grid>
//             <Paper style={paperStyle}>
//                 <Grid align="center">
//                     <Avatar style={avatarStyle}><AddCircleIcon/></Avatar>
//                     <h2>Register</h2>
//                 </Grid>
//                 <TextField style={fieldStyle} label="Username" placeholder= "Enter username" fullWidth required/>
//                 <TextField style={fieldStyle} label="Email Address" placeholder= "Enter email" fullWidth required/>
//                 <TextField style={fieldStyle} label="Password" placeholder= "Enter password" type="password" fullWidth required/>
//                 <FormControlLabel
//                     control={
//                         <Checkbox name="checkedB" color="default"/>
//                     }
//                     label = "Agree to Terms and Conditions"
//                 />
//                 <Button style={buttonStyle} type="submit" color="primary" variant="contained" fullWidth>
//                     Register
//                 </Button>
//             </Paper>
//         </Grid>
//     )
// }

// export default Register;