import * as React from 'react';
import Avatar from '../node_modules/@mui/material/Avatar';
import Button from '../node_modules/@mui/material/Button';
import CssBaseline from '../node_modules/@mui/material/CssBaseline';
import TextField from '../node_modules/@mui/material/TextField';
import FormControlLabel from '../node_modules/@mui/material/FormControlLabel';
import Checkbox from '../node_modules/@mui/material/Checkbox';
import Link from '../node_modules/@mui/material/Link';
import Grid from '../node_modules/@mui/material/Grid';
import Box from '../node_modules/@mui/material/Box';
import LockOutlinedIcon from '../node_modules/@mui/icons-material/LockOutlined';
import Typography from '../node_modules/@mui/material/Typography';
import Container from '../node_modules/@mui/material/Container';
import { createTheme, ThemeProvider } from '../node_modules/@mui/material/styles';
import BasicMenu from './components/Menu';
import ResponsiveAppBar from './components/Navbar';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme();

export default function SignInVendor() {
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
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>

                                <Grid item>
                                    <Link href="/signup_vendor" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
                </Container>
            </ThemeProvider>
        </div>
    );
}