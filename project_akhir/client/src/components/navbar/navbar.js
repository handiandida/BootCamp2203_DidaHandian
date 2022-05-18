import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { unauthenticateUser } from '../../redux/slices/authSlice'
import { onLogout } from '../../api/auth'
import gambar from '../../assets/img/home.jpg'


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { Toolbar, Typography, styled } from "@mui/material";
import { Box } from "@mui/system";
import MailIcon from '@mui/icons-material/Mail';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';  


const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
})

const Icons = styled(Box)(({theme}) => ({
    display: "flex",
    alignItems: "center",
    gap: "20px",
}))


const Navbar = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch()

    const [users, setUsers] = useState([])

    const logout = async () => {
        try {
            await onLogout()
            dispatch(unauthenticateUser())
            localStorage.removeItem('isAuthenticated')
            } catch (error) {
            console.log(error)
            }
        }

        const getUsersbyId = async (id_user) => {
            try {
                const res = await fetch (`http://localhost:3001/users/${id_user}`)
                const dataUsers = await res.json()
                console.log(dataUsers.users)
                setUsers(dataUsers.users)
            } catch (error) {
                console.error(error.message)
            }
        }
        
        useEffect(() => {
            getUsersbyId()
        }, [])

    return (
        <AppBar position="static">
            <StyledToolbar>
                <NavLink to='/main-forum' style={{ textDecoration: 'none', color:'inherit' }}>
                    <Typography variant="h6">Forum App</Typography>
                </NavLink>
                <Icons>
                    <Badge badgeContent={99} color="error">
                        <MailIcon />
                    </Badge>
                    <Badge badgeContent={99} color="error">
                        <NotificationsIcon />
                    </Badge>
                    <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                    <Avatar sx={{width: "30", height: "30"}} src="https://i.pinimg.com/originals/53/58/9d/53589d315d07480f046cc94eb938eed4.jpg" />
                    </IconButton>
                    </Tooltip>
                </Icons>
            </StyledToolbar>
            {/* {users.map((item) => ( */}
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
            <NavLink to={`/users/3`} style={{ textDecoration: 'none', color:'inherit' }}>
                <MenuItem>
                <Avatar sx={{width: "30", height: "30"}} src={gambar} /> Profile
                </MenuItem>
            </NavLink>
            <Divider />
            <MenuItem>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem onClick={() => logout()}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
        {/* ))} */}
        </AppBar>
    )
}

export default Navbar