import * as React from 'react';
import { useEffect, useState } from 'react'
import Layout from '../../components/layout/layout'
import moment from 'moment'
import { NavLink } from "react-router-dom";

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Checkbox } from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemIcon from '@mui/material/ListItemIcon';

const Discussion = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [discuss, setDiscuss] = useState([])

    const deleteDiscussion = async (id_thread) => {
        try {
            const deleteDiscussion = await fetch (`http://localhost:3001/discussion/${id_thread}`, { method: 'DELETE'});
            setDiscuss(discuss.filter(discussion => discussion.id_thread !== id_thread))
            console.log(deleteDiscussion)
        } catch (error) {
            console.error(error.message)
        }
    }

    const getDiscussion  = async () => {
        try {
            const res = await fetch (`http://localhost:3001/discussion`)
            const dataDiscussion = await res.json()
            console.log(dataDiscussion.discuss)
            setDiscuss(dataDiscussion.discuss)
        } catch (error) {
            console.error(error.message)
        }
    }
    
    useEffect(() => {
        getDiscussion()
    }, [])


    return (
        <Layout>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Box p={1}>
                    {discuss.map((item) => (
                    <Card sx={{ maxWidth: 700, margin:5, borderRadius: 3 }}>
                        <CardHeader
                            avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {item.id_user}
                            </Avatar>
                            }
                            action={
                            <IconButton aria-label="settings">
                                <Tooltip title="Post settings">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                    <MoreVertIcon />
                                    </IconButton>
                                </Tooltip>
                            </IconButton>
                            }
                            title={
                                <Typography>{item.id_user}</Typography>
                            }
                            subheader={
                                <Typography>{moment(item.date_main).format('LLL')}</Typography>
                            }
                        />
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: -2 }}>
                            {item.title_thread}
                            </Typography>
                        </CardContent>
                        <CardContent>
                        <CardMedia
                            component="img"
                            height="400"
                            image="https://i.pinimg.com/736x/b8/ba/a3/b8baa34baa167a348221b0e823b0952b.jpg"
                            alt="Dida Handian"
                            sx={{ borderRadius: 3 }}
                        />
                        </CardContent>
                        <CardContent>
                            <Typography variant="body1">
                            {item.body_thread}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color : "red"}} />} />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            <IconButton aria-label="comment">
                                <CommentIcon  />
                            </IconButton>
                            <Button onClick={() => deleteDiscussion(item.id_thread)} >delete</Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                <NavLink to={`/edit-thread`} style={{ textDecoration: 'none', color:'inherit' }}>
                                <MenuItem>
                                    <ListItemIcon>
                                        <EditIcon fontSize="small" />
                                    </ListItemIcon>
                                    Edit
                                </MenuItem>
                                </NavLink>
                                <MenuItem onClick={() => deleteDiscussion(item.id_thread)}>
                                    <ListItemIcon >
                                        <DeleteIcon fontSize="small" sx={{ color: "red" }} />
                                    </ListItemIcon>
                                    Delete
                                </MenuItem>
                            </Menu>
                        </CardActions>
                    </Card>
                    ))}
                    </Box>
                </Grid>
                <Grid item xs={3} mt={6}>
                        <Card>
                            <CardContent>
                                <Typography variant='h6' textAlign={"center"}>Hi, Dida Handian</Typography>
                                <hr></hr>
                                <NavLink to='/add-thread' style={{ textDecoration: 'none', color:'inherit' }}>
                                <Button variant="contained" textAlign={"center"} fullWidth>Buat Thread Sekarang</Button>
                                </NavLink>
                            </CardContent>
                        </Card>
                        <Card style={{ marginTop: "50px"}}>
                            <CardContent>
                                <Typography variant='h6' textAlign={"center"}>Untuk Hiasan nanti</Typography>
                            </CardContent>
                        </Card>
                </Grid>
            </Grid>    
        </Layout>
    )
}

export default Discussion