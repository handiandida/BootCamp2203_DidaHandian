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
import { styled } from '@mui/material/styles';




const AddMain = () => {

    const [file, setFile] = useState()
    const [title_main, setTitle_Main] = useState('')
    const [body_main, setBody_Main] = useState('')
    const [date_main, setDate_Main] = useState('')

    const onSubmitForm = async e => {
        e.preventDefault()
        try {
            let formData = new FormData()
                formData.append('img_main', file)
                formData.append('title_main', title_main)
                formData.append('body_main', body_main)
                formData.append('date_main', date_main)
                console.log(formData)
            const res = await fetch("http://localhost:3001/main-forum/add", {
                method : "POST",
                // headers : {"Content-Type" : "application/json"},
                // body : JSON.stringify(body)
                headers : {Accept: "multipart/form-data",},
                body : formData
            })

            console.log(res)
            window.location = "/main-forum"
        } catch (error) {
            console.error(error.message)
        }
    }

    const Input = styled('input')({
        display: 'none',
    });


    return (
        <Layout>
        <Box p={5}>
            <Card>
                <CardContent>
                <Typography component="h1" variant="h5" mb={5} ml={5} mt={5}>
                    Form Add Main
                </Typography>
                <Box component="form" onSubmit={onSubmitForm} encType="multipart/form-data">
                    <Grid container spacing={5}>
                        <Grid item xs={12} sx={{ mr: 5, ml: 5 }}>
                            <TextField
                            autoComplete="given-name"
                            name="title_main"
                            required
                            fullWidth
                            id="title_main"
                            label="Judul Main"
                            autoFocus
                            onChange={e => setTitle_Main(e.target.value)}
                            value={title_main}
                            />
                        </Grid>
                        <Grid item xs={12}  sx={{ mr: 5, ml: 5 }}>
                            <TextField
                                id="body_main"
                                name="body_main"
                                label="Isi Main"
                                multiline
                                rows={4}
                                required
                                fullWidth
                                maxRows={5}
                                onChange={e => setBody_Main(e.target.value)}
                                value={body_main}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ mr: 5, ml: 5 }}>
                            <TextField
                            name="date_main"
                            required
                            id="date_main"
                            label="Date Main"
                            type='date'
                            InputLabelProps={{
                                shrink: true}}
                            onChange={ e => setDate_Main(e.target.value)}
                            value={date_main}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ mr: 5, ml: 5 }}>
                            <img id="img_main" src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" height={"200px"} width={"200px"}/>
                            <label htmlFor="contained-button-file">
                                <Input accept="image/*" id="contained-button-file" multiple type="file"  onChange = { e => setFile(e.target.files[0])}/>
                                <Button variant="contained" component="span" sx={{ marginLeft : 2 }}>
                                    Upload
                                </Button>
                            </label>
                        </Grid>
                        </Grid>
                        <NavLink to='/main-forum' style={{ textDecoration: 'none', color:'inherit' }}>
                            <Button
                            type="submit"
                            variant="outlined"
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

export default AddMain