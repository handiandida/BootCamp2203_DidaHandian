import * as React from 'react';
import Layout from '../../components/layout/layout'
import moment from 'moment'
import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';
import EditMain from './edit-main';

import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container, Grid } from '@mui/material';
import CardActionArea from '@mui/material/CardActionArea';

const MainForum = () => {

    const [mains, setMains] = useState([])

    const getForum = async () => {
        try {
            const res = await fetch (`http://localhost:3001/main-forum`)
            const dataMains = await res.json()
            console.log(dataMains.mains)
            setMains(dataMains.mains)
        } catch (error) {
            console.error(error.message)
        }
    }

    const deleteForum = async (id_main) => {
        try {
            const deleteForum = await fetch (`http://localhost:3001/main-forum/${id_main}`, { method: 'DELETE'});
            setMains(mains.filter(forum => forum.id_main !== id_main))
            console.log(deleteForum)
        } catch (error) {
            console.error(error.message)
        }
    }

    
    useEffect(() => {
        getForum()
    },[])


    return(
        <Layout>
            <Box p={2}>
                    <NavLink to='/main-forum/add' style={{ textDecoration: 'none', color:'inherit' }}>
                        <Button variant='contained' sx={{ float: 'right', marginRight: 5 }}>Add</Button>
                    </NavLink>
                    <Grid container spacing={5}>
                    {mains.map((item) => (
                            <Card sx={{ margin: 5, overflow: 'hidden', width: '25%', borderRadius: 3 }}>
                                <CardContent>
                                <CardMedia
                                    component="img"
                                    height={200}
                                    maxWidth= {345}
                                    src={item.img_main}
                                    alt="image"
                                    sx={{ borderRadius: 3, display: { xs: 'none', sm: 'block' } }}
                                    
                                />
                                </CardContent>
                                <CardContent>
                                    <Typography variant='h5' mb={2}>{item.title_main}</Typography>
                                    <Typography variant='body1' mb={2}>{item.body_main}</Typography>
                                    <Typography variant='body2'>{moment(item.date_main).format('LLL')}</Typography>
                                </CardContent>
                                <CardActions>
                                <EditMain item={item} />
                                    <Button size="small" color='error' onClick={() => deleteForum(item.id_main)}>Delete</Button>
                                </CardActions>
                            </Card>
                    ))}
                    </Grid>
            </Box>
        </Layout>       
    )
}

export default MainForum