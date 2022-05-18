import * as React from 'react';
import { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Layout from '../../components/layout/layout';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';



const EditThread = () => {

    return (
        <Layout>
        <Box p={5}>
            <Card>
                <CardContent>
                <Typography component="h1" variant="h5" mb={5} ml={5} mt={5}>
                    Edit Add Thread
                </Typography>
                <Box component="form" noValidate >
                    <Grid container spacing={5}>
                        <Grid item xs={12} sx={{ mr: 5, ml: 5 }}>
                            <TextField
                            autoComplete="given-name"
                            name="title_thread"
                            required
                            fullWidth
                            id="title_thread"
                            label="Judul Thread"
                            autoFocus
                            // onChange=''
                            // value=''
                            />
                        </Grid>
                        <Grid item xs={12}  sx={{ mr: 5, ml: 5 }}>
                            <TextField
                                id="body_thread"
                                label="Isi Thread"
                                multiline
                                rows={4}
                                required
                                fullWidth
                                maxRows={5}
                                // onChange=''
                                // value=''
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ mr: 5, ml: 5 }}>
                            <TextField
                            name="date_thread"
                            required
                            id="date_thread"
                            label="Date Thread"
                            type='date'
                            InputLabelProps={{
                                shrink: true}}
                            // onChange=''
                            // value=''
                            />
                        </Grid>
                        </Grid>
                        <NavLink to='/discussion' style={{ textDecoration: 'none', color:'inherit' }}>
                            <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 5, mb: 5, mr:5, float:"right" }}
                            >
                            Cancel
                            </Button>
                        </NavLink>
                        <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 5, mb: 5, mr: 2, float:"right" }}
                        >
                        Submit
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
        </Layout>
    )
}

export default EditThread