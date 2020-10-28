
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from 'react'
import Loading from '../components/loading'
import { getSession } from 'next-auth/client'
import Head from 'next/head'
import { Avatar, Box, Card, CardHeader, Container, IconButton, makeStyles } from '@material-ui/core'
import Sidearea from '../components/Sidearea'
import Chatarea from '../components/Chatarea'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import AccessDenied from '../components/AccessDenied'





const useStyles = makeStyles((theme) => ({
    main: {
        // display: 'flex',
        //flex: 1,
        margin: '60px 60px 60px 60px',
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
        paddingBottom: 0
        //flex: 1
    }
}))


const Home = ({ data, session }) => {

    const [chat, setchat] = useState([])
    const classes = useStyles()

    if (!session) {
        return <Container>
            <AccessDenied />
        </Container>
    }

    return (

        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box className={classes.main} my="auto">
                <Card raised>
                    <div className={classes.container}>
                        <Sidearea user={session.user} chatItems={data} chatTrigger={setchat} />
                        <Chatarea user={session.user} chatData={chat} />
                    </div>
                </Card>
            </Box>

        </div>

    )
}

export async function getServerSideProps(context) {

    const session = await getSession(context);


    let res = await fetch('http://localhost:3000/api/chats/all', {
        headers: {
            cookie: context.req.headers.cookie
        }
    })

    const data = await res.json();


    //req.headers.cookies = session;
    return {
        props: {
            session,
            data

        }, // will be passed to the page component as props
    }

}
export default Home

