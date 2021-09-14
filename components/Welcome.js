import React from 'react'
import { Avatar, Box, makeStyles, Typography } from '@material-ui/core'



const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#101318',
        height: '100%'
    },
    message1: {
        color: 'lightgray',
        fontWeight: 200,
        marginTop: theme.spacing(3),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5)
    },

    large_avatar: {
        width: '200px',
        height: '200px',
    },
    divider_background: {
        backgroundColor: '#ccc',
        height: '1px',
        border: 'none'
    },

}));


function Welcome({ user }) {
    const classes = useStyles()
    return (
        <div className={classes.root}>

            <Box mx="auto" mt={10} display="flex" flexDirection="column" alignItems="center" className={classes.no_messages_area}>
                <Avatar className={classes.large_avatar} src={user.image} alt='img' />

                <Typography variant='h4' className={classes.message1}>
                    Keep your phone connected
                </Typography>
                <Box mt={1} color="lightgray">
                    WhatsApp connects to your phone to sync messages.  To reduce data
                </Box>
                <Box color="lightgray">
                    usage, connect your phone
                    to Wi-Fi.
                </Box>
                <Box width="100%" mt={3} className={classes.divider_background}>
                </Box>

            </Box>
        </div>
    )
}

export default Welcome
