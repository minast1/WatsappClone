import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Avatar, Box, Card, CardHeader, IconButton, makeStyles } from '@material-ui/core'
import Sidearea from '../components/Sidearea'
import Signin from '../components/Signin'
import Chatarea from '../components/Chatarea'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Header from '../components/Header'
import Mainarea from '../components/Mainarea'
import Divider from '@material-ui/core/Divider';




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


export default function Home() {
  const classes = useStyles()
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box className={classes.main} my="auto">

        <div className={classes.container}>
          <Signin />
        </div>

      </Box>


    </div>
  )
}
