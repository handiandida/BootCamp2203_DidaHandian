import * as React from 'react';
import { useEffect, useState } from 'react'
import Layout from '../../components/layout/layout'
import image from '../../assets/img/002.jpg'

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const User = () => {

    const [users, setUsers] = useState([])

    const deleteUser = async (id_user) => {
        try {
            const deleteUser = await fetch (`http://localhost:3001/users/${id_user}`, { method: 'DELETE'});
            setUsers(users.filter(user => user.id_user !== id_user))
            console.log(deleteUser)
        } catch (error) {
            console.error(error.message)
        }
    }

    const getUsers = async () => {
        try {
            const res = await fetch (`http://localhost:3001/users`)
            const dataUsers = await res.json()
            console.log(dataUsers.users)
            setUsers(dataUsers.users)
        } catch (error) {
            console.error(error.message)
        }
    }
    
    useEffect(() => {
        getUsers()
    }, [])

    const Input = styled('input')({
        display: 'none',
    });


    return (
        <Layout>
            <Typography variant="h4" sx={{ marginLeft: 5, marginTop: 5 }}>
                Account
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Box p={5} sx={{  alignItems: 'center' }}>
                    <Card>
                        <Avatar
                            alt="Remy Sharp"
                            src={image}
                            sx={{ width: 150, height: 150, margin: "auto", marginTop: 2 }}
                        />
                        <CardContent>
                            <Typography variant="h5" textAlign={"center"}>
                                Hanya Dida Yang Tampan
                            </Typography>
                        </CardContent>
                        <hr></hr>
                        {/* <CardActions> */}
                        <label>
                            <Input accept="image/*"  multiple type="file" />
                            <Button color="secondary" variant="text" component="span" sx={{ marginBottom: 2, marginLeft: 15}}>
                                Upload Gambar
                            </Button>
                        </label>
                    </Card>
                    </Box>
                </Grid>
                <Grid item xs={7} mt={5}>
                {users.map((item) => (
                    <Box component="form" onSubmit="">
                        <Card>
                            <CardContent>
                                <Typography variant='h4' sx={{ marginTop: 3 }}>Profile</Typography>
                                <Typography variant='body1' sx={{ marginBottom: 5 }}>The Profile can be edited</Typography>
                                <hr></hr>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                        InputLabelProps={{
                                            shrink: true}}
                                        autoComplete="given-name"
                                        name="name"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Full Name"
                                        value={item.name}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                        InputLabelProps={{
                                            shrink: true}}
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="family-name"
                                        value={item.email}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="Email"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Phone Number"
                                        name="lastName"
                                        autoComplete="family-name"
                                        />
                                    </Grid>
                                </Grid>
                                <Button color="secondary" variant="contained" sx={{ float: 'right',  marginBottom: 3, marginTop: 3}}>Save Details</Button>
                            </CardContent>
                        </Card> 
                    </Box>
                    ))} 
                </Grid>
            </Grid>
        </Layout>
    )
}

export default User