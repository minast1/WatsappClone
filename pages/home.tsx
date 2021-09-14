
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from 'react'
import Loading from '../components/loading'
//import { getSession, useSession } from 'next-auth/client'
import Head from 'next/head'
import { Avatar, Box, Card, CardHeader, Container, IconButton, makeStyles, Paper } from '@material-ui/core'
import Sidearea from '../components/Sidearea'
import Chatarea from '../components/Chatarea'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import AccessDenied from '../components/AccessDenied'
//import useSWR from 'swr'
import Welcome from '../components/Welcome'
import { useRouter } from 'next/router'




const useStyles = makeStyles((theme) => ({
    main: {
        // display: 'flex',
        // height: theme.spacing(84),
        width: '100%',
        marginBottom: 0
        //margin: '60px 60px 60px 60px',
        // flexDirection: 'row'
    },
    avatar: {
        // backgroundColor: red[500],
    },
    icon: {
        marginRight: '10px',

    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        // height: '200vh'
        height: theme.spacing(84),
        overflow: 'hidden'
    }
}))


const Home = ( ) => {
 

    const [chat, setchat] = useState(null)
    const classes = useStyles()

    const redirectTo = () => {
        return //router.push(url)
    }
    // console.log(chat)
    /*if () {
        return <AccessDenied />
    }
*/


    return (

        <div>
            <Head>
                <title>WatsappClone</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container disableGutters={true} maxWidth='xl' className={classes.container}>

                <Sidearea user={ } getChat={} />
                {chat ? <Chatarea user={} chat={chat} /> : <Welcome user={session.user} />}

            </Container>
        </div>

    )
}

export async function getServerSideProps(context) {
    let chats = null
    const session = await getSession(context);
   
    //req.headers.cookies = session;
    return {
        props: {
            session,
            chats

        }, // will be passed to the page component as props
    }


}
export default Home

