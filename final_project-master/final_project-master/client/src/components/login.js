// import React from "react";
// import App from "../App";
// import { Avatar, Button, FormControlLabel, Grid, Link, Paper, TextField, Typography } from "@mui/material";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import Checkbox from "@material-ui/core/Checkbox";
// const Login=()=> {
    
//     const paperStyle = {padding: 20, height: "60vh", width: 400, margin: "0 auto"}
//     const avatarStyle = {backgroundColor: "#ffad06"}
//     const buttonStyle = {margin: "20px 0px", height: "50px", borderRadius: "5px", backgroundColor: "#ffad06"}
//     const fieldStyle = {margin: "5px 0px"}
//     return(
//         <Grid>
//             <Paper style={paperStyle}>
//                 <Grid align="center">
//                     <Avatar style={avatarStyle}><AccountCircleIcon/></Avatar>
//                     <h2>Sign In</h2>
//                 </Grid>
//                 <TextField style={fieldStyle} label="Username" placeholder= "Enter username" fullWidth required/>
//                 <TextField style={fieldStyle} label="Password" placeholder= "Enter password" type="password" fullWidth required/>
//                 <FormControlLabel
//                     control={
//                         <Checkbox name="checkedB" color="default"/>
//                     }
//                     label = "Remember me"
//                 />
//                 <Button style={buttonStyle} type="submit" color="primary" variant="contained" fullWidth>
//                     Sign In
//                 </Button>
//             </Paper>
//         </Grid>
//     )
// }

// export default Login;