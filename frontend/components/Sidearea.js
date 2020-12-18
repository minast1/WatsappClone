import React, { useState } from 'react'
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { AppBar, Avatar, Box, ButtonBase, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Paper, Toolbar, Typography } from '@material-ui/core';
import DonutLargeSharpIcon from '@material-ui/icons/DonutLargeSharp';
import ChatSharpIcon from '@material-ui/icons/ChatSharp';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useSWR from 'swr';
import { fetcher } from '../pages/home'
import moment from 'moment'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';


const useStyles = makeStyles((theme) => ({
    root: {
        flex: 0.35,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#101318',//'#37474f',
        borderRight: '1px solid #272c35',
        flexGrow: 0.35,


    },

    chats: {
        display: 'flex',
        alignItems: 'stretch',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            cursor: 'pointer'

        }
    },

    input: {
        color: 'lightgray',
        flex: 0.9,
        //flexGrow: 'grow'
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },

    searchChat: {
        //padding: '4px',
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        flexShrink: 1,
        height: 40,
        borderRadius: '25px',
        backgroundColor: theme.palette.primary.main
    },
    iconButton: {
        padding: 10,
    },

    listItem: {
        '& .MuiListItem-root': {
            '&:hover': {
                '& $iconDisplay': {
                    display: 'flex'
                }
            }
        },
    },
    iconDisplay: {
        display: 'none'
    },
    stickynav: {
        //position: 'fixed',
        // top: 0,
        width: '100%'

    },
    appBarIconContainer: {

        '& .MuiButtonBase-root': {

            [theme.breakpoints.down('md')]: {
                padding: '3px'
            },

        }
    }

}));

const getChatProfileImage = (array) => {
    return array.length > 1 ? '/avatar-3.jpg' : array[0].participant.image
}



export default function Sidearea({ user, getChat }) {
    const { data } = useSWR('/api/chats/all', fetcher, {
        revalidateOnFocus: false
    })
    // console.log(data)
    const [selectedIndex, setselectedIndex] = useState(null);
    const hadleListItemClick = (event, index) => {
        setselectedIndex(index)
    }

    const classes = useStyles();

    return (
        <div className={classes.root} style={{ height: '100%' }}>
            <Box className={classes.stickynav}>
                <AppBar color='primary' position="static">
                    <Toolbar className={classes.toolbar}>

                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <Avatar src={user.image ? user.image : '/avatar.jpg'} />
                        </IconButton>
                        <span style={{ marginLeft: 'auto' }} className={classes.appBarIconContainer}>
                            <ButtonBase edge="end" color="inherit" >
                                <DonutLargeSharpIcon />
                            </ButtonBase>
                            <ButtonBase edge="end" color="inherit">
                                <ChatSharpIcon />
                            </ButtonBase>
                            <ButtonBase aria-label="display more actions" edge="end" color="inherit" >
                                <MoreVertIcon />
                            </ButtonBase>
                        </span>
                    </Toolbar>
                </AppBar>

            </Box>
            <Paper component="form" className={classes.searchChat} elevation={0}>
                <IconButton className={classes.iconButton}>
                    <SearchIcon style={{ color: 'gray' }} />
                </IconButton>
                <InputBase
                    className={classes.input}
                    placeholder="Search or start new chat...."
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
            </Paper>
            <Divider style={{ backgroundColor: '#1f232a' }} />
            <List style={{ paddingTop: 0.5, paddingRight: 7 }} className={classes.listItem}>

                {data && data.map((el = { messages, id, name, owner, participants }) => (
                    <React.Fragment key={el.id}>
                        <ListItem alignItems="flex-start" button onClick={(event) => {
                            hadleListItemClick(event, el.id)
                            getChat(el)
                        }} selected={selectedIndex === el.id}
                        >
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={getChatProfileImage(el.participants)} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={el.name}
                                secondary={
                                    <React.Fragment>
                                        {el.messages.length > 0 ? el.messages.slice(-1)[0].body : ''}
                                    </React.Fragment>
                                }
                            />
                            <ListItemIcon style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant='caption' style={{ color: 'darkgray' }}>
                                    {moment(el.createdAt).format('L')}
                                </Typography>
                                <KeyboardArrowDownIcon className={classes.iconDisplay} />
                            </ListItemIcon>
                        </ListItem>
                        <Divider style={{ backgroundColor: '#1f232a', marginLeft: '70px' }} />
                    </React.Fragment>

                ))}

            </List>


        </div >
    );
}    
