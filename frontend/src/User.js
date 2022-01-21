import * as React from 'react';
import BasicCard from './components/card';
import ResponsiveAppBar from './components/Navbar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '../node_modules/@mui/material/FormControlLabel';
// import Checkbox from '../node_modules/@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import ResponsiveAppBar from './components/Navbar';
import BasicMenu from './components/Menu';
import validator from 'validator';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const theme = createTheme();

export default function UserDashboard() {
    const navigate = useNavigate();

    const checkPage = (event) => {
        if (!(localStorage.getItem("token"))) {
            navigate("/signin_user");
        }
    }
    useEffect(() => {
        let ignore = false;
        
        if (!ignore)  checkPage()
        return () => { ignore = true; }
        },[]);

    return (
        // <Box>
        // <ResponsiveAppBar />
        // <BasicCard />
        // </Box>

        <div>
            
            {/* {checkPage} */}
            <div>
                <ResponsiveAppBar />
            </div>
            <br></br>
            <br></br>
            <br></br>
            {/* <div align="center">
                <BasicMenu type="Buyer" />
            </div> */}
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar> */}
                        {/* <Typography component="h1" variant="h5">
                            Sign in
                        </Typography> */}
                        <Box component="form" sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                
                                
                                {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
                                
                                <Grid container>

                                    {/* <Grid item>
                                        <Link href="/signup_user" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid> */}
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
                </Container>
            </ThemeProvider>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
}