import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { TextField } from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backend_base_url = "http://localhost:4000";


export default function BasicCardUser(props) {
    const navigate = useNavigate();

    console.log(props.items);

    const [quantity, setQuantity] = React.useState(1);
    const [order_addons, setOrderAddons] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [dialog_item, setDialogItem] = React.useState({
        addons: ""
    });

    // const [checked, setChecked] = React.useState(false);

    const handleCheckboxChange = (event, addon) => {
        // setChecked(event.target.checked);
        // if (event.target.checked === true) {
        //     order_addons.push(addon);
        //     console.log(order_addons);
        // }
        // else {
        const index = order_addons.indexOf(addon);
        if (index > -1) {
            order_addons.splice(index, 1);
            // }
            console.log(order_addons);
        }
        else {
            order_addons.push(addon);
            console.log(order_addons);
        }
    };

    const handleQuantity = (item, value) => {

    }



    const handleSubmit = (item) => {
        setOpen(false);
        const token = sessionStorage.getItem("token");
        var tot_cost = (item.price) * (quantity);

        function myFunc(value, index, array) {
            tot_cost += (value[1]) * 1;
        }
        order_addons.forEach(myFunc);

        var currentdate = new Date();
        var datetime = "Ordered On: " + currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        axios
            .post(`${backend_base_url}/order/register`, {
                shop_name: item.shop_name,
                item_name: item.item_name,
                cost: tot_cost,
                placed_time: datetime,
                quantity: quantity,
                status: "placed",
                rating: item.rating,
                veg: item.veg,
                tags: item.tags,
                addons: order_addons
            }, { headers: { "auth-token": token } })
            .then((res) => {
                alert("Item has been ordered successfully");
                window.location.reload();
                // navigate("/vendor_dashboard");
                // callPopUp();
            }
            )
            .catch((err) => {
                // navigate("/signin_user");
                // if (err.response.status === 400) {
                alert("Item order unsuccessful. Please check your wallet balance and also make sure you're signed in");
                // }
                // callPopUp();
            })



        // setChecked(false);
        setOrderAddons([]);
    }

    const handleClose = () => {
        setOpen(false);
        // setChecked(false);
        setOrderAddons([]);
    }


    const display_cards = (props) => {
        const items = props.items;

        const display_tags = (item) => {
            const tags = item.tags;
            // console.log(tags);

            if (tags.length > 0) {
                return (
                    tags.map((tag, index) => {
                        return (
                            <Chip label={tag}></Chip>
                        )
                    })
                )
            }
            else {
                return (
                    <h6>No Tags</h6>
                )

            }

        }

        const display_veg = (item) => {
            const veg = item.veg;
            // console.log(veg);
            if (veg.length > 0) {
                if (veg === "veg") {
                    return (
                        <Chip label="Veg" color="success"></Chip>
                    )
                }
                else {
                    return (
                        <Chip label="Non-Veg" color="error"></Chip>
                    )
                }

            }
            else {
                return (
                    <>error</>
                )
            }
        }

        const display_addons = (item) => {
            const addons = item.addons;
            // console.log(addons);
            if (addons.length > 0) {
                return (
                    addons.map((addon, index) => {
                        const disp = addon[0] + ", Rs " + addon[1];
                        // order_addons.push(addon);
                        return (
                            <FormControlLabel control={<Checkbox onChange={(event) => { handleCheckboxChange(event, addon) }} />} label={disp} />
                        )

                    })
                )

            }
            else {
                return (
                    <h6>No Addons</h6>
                )
            }
        }


        if (items.length > 0) {
            return (
                items.map((item, index) => {
                    // console.log(item);

                    const handleOrder = (item) => {
                        setDialogItem(item);
                        setOpen(true);
                        // console.log(item);
                    }
                    return (
                        <div>
                            <Card sx={{ minWidth: 150 }} style={{
                                display: 'flex',
                                flexDirection: 'row',
                                backgroundColor: 'lightyellow'
                            }}>
                                <CardContent style={{
                                    flex: 7,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center'
                                }}>
                                    <Grid style={{
                                        flex: 0.5,
                                        display: 'flex'
                                    }}>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            <Checkbox color='error' icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                                        </Grid>
                                    </Grid>
                                    <Grid style={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            <Typography variant="h5" component="div" >
                                                {item.item_name}
                                            </Typography>
                                        </Grid>
                                        <br></br>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary" >
                                                {item.shop_name}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid style={{
                                        flex: 1,
                                        display: 'flex'
                                    }}>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            <Typography variant='h5'>
                                                <CurrencyRupeeIcon fontSize='small' /> {item.price}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid style={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            {/* <Stack direction="column"> */}
                                            {display_tags(item)}
                                            {/* </Stack> */}
                                        </Grid>
                                    </Grid>
                                    <Grid style={{
                                        flex: 1,
                                        display: 'flex'
                                    }}>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            {/* <Chip label={item.veg} ></Chip> */}
                                            {display_veg(item)}

                                        </Grid>
                                    </Grid>
                                    {/* <Grid style={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            <Typography variant="h6">
                                                Add-ons
                                            </Typography>
                                        </Grid>
                                        <FormGroup>
                                            {display_addons(item)}
                                        </FormGroup>


                                    </Grid> */}
                                    <Grid style={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            <Rating name="read-only" value={item.rating} readOnly />
                                        </Grid>
                                        {/* <Grid item style={{
                                            flex: 1
                                        }}>
                                            <TextField
                                                autoComplete="Quantity"
                                                name="quantity"
                                                type="number"
                                                required
                                                // fullWidth
                                                id="quantity"
                                                label="Quantity"
                                                value={quantity}
                                                onChange={(event) => {
                                                    event.target.value = event.target.value < 0 ? (0) : event.target.value;
                                                    handleQuantity(item, event.target.value)
                                                }
                                                }>

                                            </TextField>
                                        </Grid> */}
                                    </Grid>

                                </CardContent>
                                <CardActions style={{
                                    flex: 1
                                }}>
                                    <Button size="small" onClick={() => handleOrder(item)}>Order</Button>
                                    {/* <Button size="small">Delete</Button> */}
                                </CardActions>

                            </Card>

                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Order item</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Select Addons and quantity
                                    </DialogContentText>
                                    <br></br>
                                    <Grid style={{
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>

                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            <Typography variant="h6">
                                                Add-ons
                                            </Typography>
                                        </Grid>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            <FormGroup>
                                                {display_addons(dialog_item)}
                                            </FormGroup>
                                        </Grid>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            <TextField
                                                autoComplete="Quantity"
                                                name="quantity"
                                                type="number"
                                                required
                                                // fullWidth
                                                id="quantity"
                                                label="Quantity"
                                                value={quantity}
                                                onChange={(event) => {
                                                    event.target.value = event.target.value < 0 ? (0) : event.target.value;
                                                    setQuantity(event.target.value);
                                                    // handleQuantity(item, event.target.value)
                                                }
                                                }>

                                            </TextField>

                                        </Grid>

                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={() => handleSubmit(dialog_item)}>Buy</Button>
                                </DialogActions>
                            </Dialog>

                            <br></br>
                            <br></br>

                        </div>

                    )
                })
            )

        }

        else {
            return (<h3>No items yet</h3>)
        }
    }


    return (
        (display_cards(props))

    );
}
