import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import prisma from '../../../src/prisma'
import Adapters from 'next-auth/adapters'



const options = {
    site: process.env.NEXTAUTH_URL || 'http://localhost:3000',

    providers: [

        // When configuring oAuth providers make sure you enabling requesting
        // permission to get the users email address (required to sign in)
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET,
        }),

        Providers.Twitter({
            clientId: process.env.NEXTAUTH_TWITTER_ID,
            clientSecret: process.env.NEXTAUTH_TWITTER_SECRET,
        }),

    ],

    adapter: Adapters.Prisma.Adapter({ prisma }),


    /* @link https://next-auth.js.org/configuration/databases
    database: {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'lukatoni',
        database: 'postgres',
        synchronize: true
    }, */

    secret: process.env.SECRET,
    // @link https://next-auth.js.org/configuration/options#session */
    session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `jwt` is automatically set to `true` if no database is specified.
        jwt: true,
        // Seconds - How long until an idle session expires and is no longer valid.
        //maxAge: 30 * 24 * 60 * 60, // 30 days
        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        // updateAge: 24 * 60 * 60, // 24 hours
    },

    // @link https://next-auth.js.org/configuration/options#jwt
    jwt: {
        // A secret to use for key generation - you should set this explicitly
        // Defaults to NextAuth.js secret if not explicitly specified.
        secret: process.env.SECRET,
        // Set to true to use encryption. Defaults to false (signing only).
        // encryption: true,
        // You can define your own encode/decode functions for signing and encryption
        // if you want to override the default behaviour.
        // encode: async ({ secret, token, maxAge }) => {},
        // decode: async ({ secret, token, maxAge }) => {},
    },

    debug: true,

    callbacks: {

        session: async (session, user) => {

            session = user
            // console.log(session)
            const userId = await prisma.user.findUnique({
                where: {
                    email: session.user.email
                },
                select: {
                    id: true
                }
            })
            const { id } = userId
            session.id = id

            return Promise.resolve(session)
        },
        jwt: async (token, user, account, profile, isNewUser) => {
            const isSignIn = (user) ? true : false;
            if (isSignIn) {
                token.user = user
            }


            return Promise.resolve(token)
        }

    }
}


const Auth = (req, res) => NextAuth(req, res, options)

export default Auth