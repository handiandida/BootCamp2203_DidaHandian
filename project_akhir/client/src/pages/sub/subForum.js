import * as React from 'react';
import Layout from '../../components/layout/layout'
import moment from 'moment'
import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';

import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const SubForum = () => {

    const [subs, setSubs] = useState([])

    const getSub = async () => {
        try {
            const res = await fetch (`http://localhost:3001/sub-forum`)
            const dataSubs = await res.json()
            console.log(dataSubs.subs)
            setSubs(dataSubs.subs)
        } catch (error) {
            console.error(error.message)
        }
    }
    
    useEffect(() => {
        getSub()
    },[])
    return(
        <Layout>
            <Box p={2}>
            {subs.map((item) => (
                <Card sx={{ margin: 5 }}>
                    <CardContent>
                        <Typography variant='h6' mb={5}>{item.title_sub}</Typography>
                        <Typography variant='body1' mb={5}>{item.body_sub}</Typography>
                        <Typography variant='body1'>{moment(item.date_sub).format('LL')}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            ))}
            </Box>
        </Layout> 
    )
}

export default SubForum