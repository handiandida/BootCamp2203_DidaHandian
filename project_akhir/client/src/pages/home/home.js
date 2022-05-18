import './home.css'
import { AppBar, Card, CardMedia, Collapse, IconButton, Toolbar, Typography } from '@mui/material';
import { NavLink } from "react-router-dom";
import SortIcon from '@mui/icons-material/Sort';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from 'react';
import logo from '../../assets/logo-wgs.svg'

const Home = () => {
    
    const [checked, setChecked] = useState(false)

    useEffect(()=> {
      setChecked(true)
    },[])

    return (
      <div className="home">
        <div className="intro">
          <AppBar sx={{ background: 'none' }} elevation={0}>
            <Toolbar sx={{ width: "80%", margin: "0 auto" }}>
              <Typography variant='h6' sx={{ flexGrow: 1 }}>Forum App</Typography>
              <IconButton>
                <SortIcon  sx={{ fontSize: "2rem" }}/>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Collapse in={checked}  {...(checked ? { timeout: 1000 } : {})} collapsedHegiht={50}>
            <div className="direct">
              <Card sx={{ background: 'none', marginBottom: 2 }} elevation={0}>
                <CardMedia
                  component="img"
                  image={logo}
                  height="150"
                  alt="green iguana"
                />
              </Card>
              <NavLink to='login' style={{ textDecoration: 'none', color:'inherit' }}>
                <IconButton>
                  <ArrowForwardIosIcon  sx={{ fontSize: "2rem" }}/>
                </IconButton>
              </NavLink>
              </div>
          </Collapse>
        </div>
      </div>

    )
  }
  
  export default Home 