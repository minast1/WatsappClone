import { Box, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({

    reciever_background: {
        backgroundColor: '#dcf8c6',
    },

    sender_background: {
        backgroundColor: '#ffffff'
    },


}));





function MessageBox({ message, user, owner, chatname }) {
    // console.log(message)
    const classes = useStyles()
    return (
        <div>
            nothing doing
        </div>
    )
}

export default MessageBox
