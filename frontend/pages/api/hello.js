// This is an example of how to read a JSON Web Token from an API route
import jwt from 'next-auth/jwt'
import moment, { now } from 'moment'

//const secret = process.env.SECRET

export default async (req, res) => {


  res.send(`${now()}.jpeg`)
}