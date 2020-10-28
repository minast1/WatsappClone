import React, { useState } from 'react'
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar, Box, Divider } from '@material-ui/core';
import DonutLargeSharpIcon from '@material-ui/icons/DonutLargeSharp';
import ChatSharpIcon from '@material-ui/icons/ChatSharp';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const useStyles = makeStyles((theme) => ({
    root: {
        flex: 0.4,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white'

    },

    search: {
        // position: 'relative',
        display: 'flex',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            cursor: 'pointer',
        },

        //flex: '0.3'
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        //pointerEvents: 'none',
        color: 'gray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },

    chats: {
        display: 'flex',
        alignItems: 'stretch',
        '&:hover': {
            backgroundColor: '#ebebeb',
            cursor: 'pointer'

        }
    },

    midIcons: {
        marginRight: '10px',
        color: 'gray'
    },
    header: {
        backgroundColor: '#ebebeb',
    }

}));



export default function Header({ user, chatItems, chatTrigger }) {
    //console.log(chatItems)
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={1.9} className={classes.header}>
                <Avatar className={classes.avatar} src={user.picture ? user.picture : '/avatar.jpg'}></Avatar>
                <Box>
                    <DonutLargeSharpIcon className={classes.midIcons} />
                    <ChatSharpIcon className={classes.midIcons} />
                    <MoreVertIcon className={classes.midIcons} />

                </Box>
            </Box>
            { chatItems.map((chat) =>

                <Box p={2} className={classes.chats} key={chat.id} onClick={(e) => {
                    e.preventDefault();
                    chatTrigger(chat)
                }}>
                    <Avatar src="/avatar-1.jpg" />
                    <Box ml={2}>
                        <Box fontWeight="fontWeightBold">{chat.name}</Box>

                        <Box fontWeight="fontWeightRegular">{chat.messages.length > 0 ? chat.messages.slice(-1)[0].body : ''}</Box>
                    </Box>
                </Box>
            )}


        </div>
    );
}    
