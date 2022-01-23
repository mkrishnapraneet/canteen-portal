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


const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function BasicCardUser(props) {
    console.log(props.items);


    const display_cards = (props) => {
        const items = props.items;

        const display_tags = (item) => {
            const tags = item.tags;
            console.log(tags);

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
            console.log(addons);
            if (addons.length > 0) {
                return (
                    addons.map((addon, index) => {
                        const disp = addon[0] + ", Rs " + addon[1];
                        return (
                            <FormControlLabel control={<Checkbox />} label={disp} />
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
                                    <Grid style={{
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


                                    </Grid>
                                    <Grid style={{
                                        flex: 1,
                                        display: 'flex'
                                    }}>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            <Rating name="read-only" value={item.rating} readOnly />
                                        </Grid>
                                    </Grid>

                                </CardContent>
                                <CardActions style={{
                                    flex: 1
                                }}>
                                    <Button size="small">Order</Button>
                                    {/* <Button size="small">Delete</Button> */}
                                </CardActions>

                            </Card>
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
