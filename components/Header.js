import { Avatar, Box, CardHeader, IconButton, makeStyles } from '@material-ui/core'
import Divider from '@material-ui/core/Divider';
import React from 'react'





const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',

        alignItems: 'center',
        flexGrow: 1,
    },
    avatar: {
        height: '38px'
    },


}))

export default function Sidebar() {
    const classes = useStyles()
    return (
        <Box className={classes.root}>




        </Box>
    )
}
