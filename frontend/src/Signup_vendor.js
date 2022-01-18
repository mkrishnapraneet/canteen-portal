import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// import {
//     BrowserRouter,
//     Switch,
//     Route,
//     Redirect,
// } from "react-router-dom";

// import NavBar from './components/Navbar';
// import SignIn from './SignIn_user';
import ResponsiveAppBar from './components/Navbar';
import BasicMenu from './components/Menu';
import ValidEmail from './components/valid_email';
import MuiPhoneNumber from 'material-ui-phone-number';
// import BasicTimePicker from './components/timepicker';

// function Copyright(props) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
//             <Link color="inherit" href="https://mui.com/">
//                 Your Website
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

const theme = createTheme();

export default function SignUpVendor() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <div>
            <div>
                <ResponsiveAppBar />
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div align="center">
                <BasicMenu type="Vendor" />
            </div>
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
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ValidEmail />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        autoComplete="shop-name"
                                        name="shopName"
                                        required
                                        fullWidth
                                        id="shopName"
                                        label="Shop Name"

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <MuiPhoneNumber required defaultCountry={'in'} autoComplete='phone-number' />
                                </Grid>
                                <Grid item xs={12}>
                                <Typography component="h1" variant="h5">
                                    Opening Time
                                </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="opening_time_hours"
                                        label="Opening Time Hours"
                                        type="number"
                                        id="opening_time_hours"
                                        autoComplete="hours"
                                        onChange={(event) =>
                                            (event.target.value < 0 || event.target.value > 23)
                                                ? (event.target.value = 0)
                                                : event.target.value
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="opening_time_minutes"
                                        label="Opening Time Minutes"
                                        type="number"
                                        id="opening_time_minutes"
                                        autoComplete="minutes"
                                        onChange={(event) =>
                                            (event.target.value < 0 || event.target.value > 59)
                                                ? (event.target.value = 0)
                                                : event.target.value
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                <Typography component="h1" variant="h5">
                                    Closing Time
                                </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="closing_time_hours"
                                        label="Closing Time Hours"
                                        type="number"
                                        id="closing_time_hours"
                                        autoComplete="hours"
                                        onChange={(event) =>
                                            (event.target.value < 0 || event.target.value > 23)
                                                ? (event.target.value = 0)
                                                : event.target.value
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="closing_time_minutes"
                                        label="Closing Time Minutes"
                                        type="number"
                                        id="closing_time_minutes"
                                        autoComplete="minutes"
                                        onChange={(event) =>
                                            (event.target.value < 0 || event.target.value > 59)
                                                ? (event.target.value = 0)
                                                : event.target.value
                                        }
                                    />
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <BasicTimePicker />
                                </Grid> */}
                                {/* <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid> */}
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/signin/vendor" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    {/* <Copyright sx={{ mt: 5 }} /> */}
                </Container>
            </ThemeProvider>
        </div>
    );
}