import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import LoginForm from "../login/Login";
import RegisterForm from "../register/Register";

const SignInSystem = () => {
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const paperStyle = {width: 440, margin: "50px auto"}
    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    return (
        <Paper elevation={20} style={paperStyle}>
            <Tabs
                TabIndicatorProps= {{style: {background: "#ffad06"}}}
                textColor= "default"
                value={value}
                onChange={handleChange}
                aria-label="disabled tabs example"
            >
                <Tab label="Sign In" />

                <Tab label="Sign Up" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <LoginForm handleChange = {handleChange} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <RegisterForm />
            </TabPanel>
        </Paper>

    )
}
export default SignInSystem;