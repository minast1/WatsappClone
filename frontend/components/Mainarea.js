import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Divider, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Sidearea from '../components/Sidearea'
import Chatarea from './Chatarea'



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row'
    },

    side_area: {
        display: 'flex',
        flexDirection: 'column',
        flex: 0.35

    },

    chat_area: {
        flex: 0.65,
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap'
    }

}))

export default function Mainarea() {
    const classes = useStyles()

    return (
        <div className={classes.root}>

        </div>
    )
}
