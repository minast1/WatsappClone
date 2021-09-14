import { Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import React from 'react'


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function Loading({ loading }) {
    const classes = useStyles();
    return (
        <Backdrop className={classes.backdrop} open={loading ? true : false} >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}