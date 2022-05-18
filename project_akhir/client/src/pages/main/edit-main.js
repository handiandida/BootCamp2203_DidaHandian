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
import Modal from '@mui/material/Modal';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const EditMain = ({ item }) => {

    const [updateTitle_main, setUpdateTitle_Main] = useState(item.title_main)
    const [updateBody_main, setUpdateBody_Main] = useState(item.body_main)
    const [updateDate_main, setUpdateDate_Main] = useState(item.date_main)

    const updateMain = async e => {
        e.preventDefault()
        try {
            const body = { updateTitle_main, updateBody_main, updateDate_main }
            const res = await fetch(
                `http://localhost:3001/main-forum/${item.id_main}`,
                {
                method : "PUT",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(body)
            })


            console.log(res)
            window.location = "/main-forum"
        } catch (error) {
            console.error(error.message)
        }
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
        <Button color="success" size="small" onClick={handleOpen} target={`#id${item.id_main}`}>Edit</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            id={`#id${item.id_main}`}
        >
            <Box sx={style} component="form" encType="multipart/form-data">
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mr: 5, ml: 5, mb: 3 }}>
                    Edit Main
                </Typography>
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
                            onChange={e => setUpdateTitle_Main(e.target.value)}
                            value={updateTitle_main}
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
                                onChange={e => setUpdateBody_Main(e.target.value)}
                                value={updateBody_main}
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
                            onChange={e => setUpdateDate_Main(e.target.value)}
                            value={updateDate_main}
                            />
                        </Grid>
                        </Grid>
                            <Button
                            variant="outlined"
                            sx={{ mt: 5, mb: 5, mr:5, float:"right" }}
                            onClick={handleClose}
                            >
                            Cancel
                            </Button>
                        <Button
                        variant="contained"
                        sx={{ mt: 5, mb: 5, mr: 2, float:"right" }}
                        onClick={e=> updateMain(e)}
                        >
                        Save
                        </Button>
            </Box>
        </Modal>
        </div>
    )
}

export default EditMain