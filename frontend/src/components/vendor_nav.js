import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

export default function ButtonAppBarVendor() {
    const navigate = useNavigate();

    const handleOrders = (event) => {

    }

    const handleMenu = (event) => {

    }

    const handleAddItem = (event) => {
        navigate("/vendor_additem");
    }

    const handleProfile = (event) => {
        navigate("/vendor_editprofile")
    }

    const handleLogout = (event) => {

        sessionStorage.removeItem("token");
        navigate("/signin_vendor");
        alert("Logged out succesfully");

    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Navigate
                    </Typography>
                    <Button color="inherit" onClick={handleOrders}>Orders</Button>
                    <Button color="inherit" onClick={handleMenu}>Menu</Button>
                    <Button color="inherit" onClick={handleAddItem}>Add Item</Button>
                    <Button color="inherit" onClick={handleProfile}>Edit Profile</Button>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}