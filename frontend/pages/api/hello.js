// This is an example of how to read a JSON Web Token from an API route
import jwt from 'next-auth/jwt'
import moment, { now } from 'moment'
import { getSession } from 'next-auth/client'

//const secret = process.env.SECRET

export default async (req, res) => {

  const session = await getSession({ req })

  res.json(session)
}