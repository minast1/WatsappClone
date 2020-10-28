import { Box } from '@material-ui/core'
import { signIn } from 'next-auth/client'
import React from 'react'

export default function AccessDenied() {
    return (
        <Box mx="auto" my="auto">
            <h1>Access Denied</h1>
            <p>
                <a href="/api/auth/signin"
                    onClick={(e) => {
                        e.preventDefault()
                        signIn('google', { callbackUrl: 'http://localhost:3000/dashboard' })
                    }}>You must be signed in to view this page</a>
            </p>
        </Box>
    )
}
