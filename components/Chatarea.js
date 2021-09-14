import { AppBar, Avatar, Box, ButtonBase, CardHeader, Chip, Divider, IconButton, InputBase, ListItemText, makeStyles, Paper, Toolbar, Typography } from '@material-ui/core';
import React, { useState, useEffect, useRef } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoodIcon from '@material-ui/icons/Mood';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import AttachFileSharpIcon from '@material-ui/icons/AttachFileSharp';
import SearchIcon from '@material-ui/icons/Search';
import Pusher from 'pusher-js';
import moment from 'moment'
import useSWR, { mutate } from 'swr';


import MessageBox from './MessageBox'; import Welcome from './Welcome';




const useStyles = makeStyles((theme) => ({
    root: {
        flex: 0.7,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#101318',
    },

    searchChat: {
        padding: '4px',

        marginTop: theme.spacing(1),
        //marginLeft: theme.spacing(2),
        // marginRight: theme.spacing(2),
        // marginBottom: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        //width: 400,
        height: 45,
        borderRadius: '30px',
        flexGrow: 1,
        backgroundColor: theme.palette.primary.main
    },
    iconButton: {
        padding: 10,
    },
    messages_area: {

        backgroundImage: 'url(/wa_bg.png)',
        //backgroundRepeat: 'no-repeat',
        backgroundSize: 'inherit',
        height: theme.spacing(70),
        overflowY: 'scroll',
        overflowX: 'scroll',
        flexGrow: 1,
        '&::-webkit-scrollbar': {
            width: '0.5em'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.main,
            //outline: '1px solid slategrey'
        }
    },
    no_messages_area: {
        height: theme.spacing(70)
    },

    reciever_background: {
        backgroundColor: '#009688',
    },

    sender_background: {
        backgroundColor: '#1f232a'
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
    },
    menuButton: {
        //marginRight: theme.spacing(0.5),
    },
    toolbar: {

        '& .MuiListItemText-primary': {
            fontWeight: 'bold',
            color: 'white'
        },
        "& .MuiListItemText-secondary": {
            color: 'white',
            [theme.breakpoints.down('xs')]: {
                display: 'none'
            }
        }
    },
    messageBox: {
        [theme.breakpoints.down('xs')]: {
            margin: '3px'
        }
    },
    title: {
        flexGrow: 1,
        alignSelf: 'center',
    },
    bottomappBar: {
        top: 'auto',
        bottom: 0,
    },
    input: {
        color: 'lightgray',
        flex: 0.9
    },



}));

const fetcher = async (uri) => {
    const res = await fetch(uri)
    const data = await res.json();
    return data
}

function Chatarea({ user, chat }) {
    const classes = useStyles()
    const inputEl = useRef(null);
    const [message, setmessage] = useState('')
    const { id, messages, participants, owner, name } = chat
    // console.log(id)
    const { data } = useSWR(`/api/messages/${id}`, fetcher, {
        revalidateOnMount: true,
        revalidateOnFocus: false
    })

    const submitMessage = (message, id) => {

        const formData = new FormData();

        formData.append('message', message)
        formData.append('id', id)
        inputEl.current.files[0] && formData.append('file', inputEl.current.files[0])
        console.log(inputEl.current.files)
        // console.log(message)
        mutate(`/api/messages/${id}`, async (data) => {

            const res = await fetch('http://localhost:3000/api/messages/post', {
                method: 'POST',
                body: formData
            })
            const json = await res.json()
            return data && [...data, json]
        })
        setmessage('')
        inputEl.current.value = ""
    }

    const getTime = (timestamp) => {
        const currentDate = new Date(timestamp)
        const hour = currentDate.getHours()
        const serializedHour = hour < 10 ? `0${hour}` : hour
        const mins = currentDate.getMinutes()
        const serializedMins = mins < 10 ? `0${mins}` : mins
        return `${serializedHour}:${serializedMins}`
    }


    const clickInput = (e) => {
        e.preventDefault();
        inputEl.current.click();
    }

    return (

        <div className={classes.root}>
            <React.Fragment>
                <AppBar color='primary' position="static">

                    <Toolbar className={classes.toolbar}>

                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <Avatar src={participants && participants[0].participant.image} />
                        </IconButton>

                        <ListItemText
                            primary={name}
                            secondary={
                                name &&
                                <React.Fragment>
                                    last seen {moment.duration(1, "minutes").humanize()}
                                </React.Fragment>
                            }
                        />
                        <ButtonBase edge="end" color="inherit">
                            <SearchIcon />
                        </ButtonBase>
                        <ButtonBase aria-label="display more actions" edge="end" color="inherit">
                            <MoreVertIcon />
                        </ButtonBase>
                    </Toolbar>

                </AppBar>

            </React.Fragment>


            <Box display="flex" flexDirection="column-reverse" className={classes.messages_area}>
                {data && data.map((el) =>

                    <Box p={1} alignSelf={el.owner.email === user.email ? 'flex-start' : 'flex-end'} key={el.id} ml={el.owner.email === user.email ? 10 : 0}
                        mr={el.owner.email === user.email ? 0 : 10} className={classes.messageBox} >
                        <Box style={{ paddingTop: 2, paddingBottom: 0 }} className={el.owner.email === user.email ? classes.sender_background : classes.reciever_background}
                            fontWeight="fontWeightRegular" borderRadius={10} p={1} width="fit-content">
                            <Typography fontWeight={700} textAlign="right" style={{ display: 'none' }} fontSize={13} >{el.owner.name === user.name ? user.name : name}</Typography>
                            {el.file ? <img src={`/${user.id}/${el.file}`} width="300px" style={{ paddingTop: '5px' }} height="fit-content" /> : <React.Fragment></React.Fragment>}

                            <span style={{ display: 'flex' }}>
                                {el.body ? <Typography style={{ fontSize: 15, fontWeight: 400, color: 'lightgray' }}>{el.body}</Typography> :
                                    <React.Fragment></React.Fragment>}
                                <Typography style={{ fontSize: 12, color: 'lightgray', paddingTop: '10px', paddingLeft: '25px', marginLeft: 'auto' }}
                                >{getTime(el.createdAt)}</Typography></span>
                        </Box>
                    </Box>
                )}
            </Box>
            <React.Fragment>
                <AppBar position="relative" color="primary" style={{ height: 62 }}>
                    <Toolbar >
                        <ButtonBase edge="start" color="inherit" aria-label="open drawer">
                            <MoodIcon />
                        </ButtonBase>
                        <div className={classes.grow} />
                        <ButtonBase color="inherit" onClick={(e) => clickInput(e)}>
                            <AttachFileSharpIcon />
                        </ButtonBase>
                        <input type="file" ref={inputEl} style={{ display: 'none' }} />
                        <Paper component="form" className={classes.searchChat} elevation={0} onSubmit={(e) => {
                            e.preventDefault()
                            submitMessage(message, id)
                        }}>
                            <ButtonBase className={classes.iconButton} type='submit'>
                                <SearchIcon />
                            </ButtonBase>

                            <InputBase
                                className={classes.input}
                                placeholder="Type a message...."
                                inputProps={{ 'aria-label': 'naked' }}
                                value={message}
                                onChange={(e) => setmessage(e.target.value)}
                            />
                        </Paper>
                        <ButtonBase edge="end" color="inherit">
                            <MicIcon />
                        </ButtonBase>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        </div >
    )
}


export default Chatarea

