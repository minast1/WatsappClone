import { Avatar, Box, CardHeader, Chip, Divider, IconButton, InputBase, makeStyles, Typography } from '@material-ui/core';
import React, { useState, useEffect, useRef } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoodIcon from '@material-ui/icons/Mood';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import AttachFileSharpIcon from '@material-ui/icons/AttachFileSharp';
import SearchIcon from '@material-ui/icons/Search';
import Pusher from 'pusher-js';
import moment from 'moment'





const useStyles = makeStyles((theme) => ({
    root: {
        flex: 0.6,
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        backgroundColor: '#ebebeb',
        borderLeft: '1px solid lightgray'
    },
    messages_area: {

        backgroundImage: 'url(/background.png)',
        height: theme.spacing(70),
        overflowY: 'scroll'
    },
    no_messages_area: {
        height: theme.spacing(70)
    },
    message_form_area: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
        marginBottom: '10px',
        backgroundColor: '#ebebeb',
        borderRadius: '30px'
    },

    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        borderRadius: '30px',
        backgroundColor: 'white',
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',

    },

    reciever_background: {
        backgroundColor: '#dcf8c6',
    },

    sender_background: {
        backgroundColor: '#ffffff'
    },
    hover_effect: {
        '&:hover': {
            cursor: 'pointer'
        }
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
    hide_input: {
        display: 'none'
    }


}));


const getTime = (timestamp) => {
    const currentDate = new Date(timestamp)
    const hour = currentDate.getHours()
    const serializedHour = hour < 10 ? `0${hour}` : hour
    const mins = currentDate.getMinutes()
    const serializedMins = mins < 10 ? `0${mins}` : mins
    return `${serializedHour}:${serializedMins}`
}


function Chatarea({ user, chatData }) {
    const classes = useStyles()
    const inputEl = useRef(null);
    const [message, setmessage] = useState("")

    // const [messages, setmessages] = useState(initialState)
    /*
   useEffect(() => {

       const pusher = new Pusher(process.env.PUSHER_KEY, {
           cluster: process.env.PUSHER_CLUSTER
       });

       const channel = pusher.subscribe('messages');
       channel.bind('inserted', function (data) {
           chatData.messages = [...chatData.messages, data]

       });
       return () => {
           channel.unbind();

       }
   }, [chatData]) */


    const submitMessage = (message, id) => {
        // const body = { message, id }

        const formData = new FormData();

        formData.append('message', message)
        formData.append('id', id)


        fetch('http://localhost:3000/api/messages/post', {
            method: 'POST',
            body: formData
        }).then(response => {
            response.json()
            console.log('Done!...')
        }).catch(error => {
            console.log(error)
        })
        // const data = await res.json()
        // chatData.messages = [...chatData.messages, data]
    }

    const submitFileMessage = () => {
        const formData = new FormData();
        formData.append('file', inputEl.current.files[0])
        formData.append('id', chatData.id);
        fetch('http://localhost:3000/api/messages/post', {
            method: 'POST',
            body: formData
        }).then(response => {
            response.json()
            console.log('Done!...')
        }).catch(error => {
            console.log(error)
        })
    }

    const clickInput = (e) => {
        e.preventDefault();
        inputEl.current.click();
    }


    if (chatData.length === 0) return (
        <div className={classes.root}>
            <Box mx="auto" mt={10} display="flex" flexDirection="column" alignItems="center" className={classes.no_messages_area}>
                <Avatar className={classes.large_avatar} src={user.picture} alt='img' />

                <Box mt={3} fontWeight="fontWeightLight" fontSize={30}>
                    Keep your phone connected
                </Box>
                <Box mt={3} color="gray">
                    WhatsApp connects to your phone to sync messages.  To reduce data
                </Box>
                <Box color="gray">
                    usage, connect your phone
                    to Wi-Fi.
                </Box>
                <Box width="100%" mt={3} className={classes.divider_background}>
                </Box>

            </Box>
        </div>
    )

    return (

        <div className={classes.root}>
            <Box display="flex" justifyContent="space-between" flexWrap="nowrap" p={1.8} alignItems="center" className={classes.header}>

                <Box display="flex" alignItems="center">
                    <Avatar>R</Avatar>
                    <Box ml={1}>
                        <Box fontWeight="fontWeightBold">{chatData.name}</Box>
                        <Box fontWeight="fontWeightRegular" color="gray">last seen {moment.duration(1, "minutes").humanize()} ago</Box>
                    </Box>
                </Box>
                <Box display="none">
                    <input type="file" ref={inputEl} onChange={submitFileMessage} />
                </Box>
                <Box display="flex" alignItems="center" color="gray">
                    <SearchIcon />

                    <MoreVertIcon />
                </Box>
            </Box>
            <Divider />

            <Box display="flex" m={1.5} flexDirection="column-reverse" className={classes.messages_area}>

                {chatData && chatData.messages.map((message) =>

                    <Box p={1} alignSelf={message.owner.email === user.email ? 'flex-end' : 'flex-start'} key={message.id}>
                        <Box className={message.owner.email === user.email ? classes.sender_background : classes.reciever_background} fontWeight="fontWeightRegular" borderRadius={16} p={1} width="fit-content">
                            <Box fontWeight={700} textAlign="right" fontSize={13}>{message.owner.name === user.name ? user.name : chatData.name}</Box>
                            {message.isFile ? <img src={`/${user.id}/${message.body}`} width="200px" /> : message.body}
                            <Box fontSize={11} textAlign="right" color="gray">{getTime(message.createdAt)}</Box>
                        </Box>
                    </Box>
                )}

            </Box>
            <Box className={classes.message_form_area}>
                <IconButton>
                    <MoodIcon color="disabled" />
                </IconButton>
                <IconButton onClick={(e) => clickInput(e)}>
                    <AttachFileSharpIcon />
                </IconButton>

                <InputBase
                    placeholder="Type a message"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    fullWidth
                    value={message}
                    onChange={(e) => setmessage(e.target.value)}
                />

                <Box color="gray" display="flex" p={1} ml={2} flexDirection="row" alignItems="center" className={classes.hover_effect}>

                    <Box onClick={(e) => {
                        e.preventDefault();
                        submitMessage(message, chatData.id)
                        setmessage("")
                    }}><SendIcon /></Box>
                    <Box> <MicIcon /></Box>


                </Box>
            </Box>

        </div>
    )
}


export default Chatarea

