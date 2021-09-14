import { Box, Container, makeStyles } from '@material-ui/core'
import { signIn } from 'next-auth/client'
import Head from 'next/head'
import React from 'react'


const useStyles = makeStyles((theme) => ({

    container: {
        flexGrow: 1,
        height: theme.spacing(84),
        overflow: 'hidden',
        color: 'black'
    }
}))


export default function AccessDenied() {
    const classes = useStyles()
    return (
        <div style={{ margin: 'auto' }}>
            <Head>
                <title>WatsappClone</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container disableGutters={true} maxWidth='xl' className={classes.container}>
                <h1>Access Denied</h1>
                <p>
                    <a href="/api/auth/signin"
                        onClick={(e) => {
                            e.preventDefault()
                            signIn('google', { callbackUrl: 'http://localhost:3000/dashboard' })
                        }}>You must be signed in to view this page</a>
                </p>

            </Container>
        </div>
    )
}
