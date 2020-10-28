//import postgres from 'postgres';
import Pusher from 'pusher'
import { Client } from 'pg'


const pusher = new Pusher({
    appId: '1093493',
    key: '362d80c1d5cab29dc782',
    secret: '07bc581012199f333225',
    cluster: 'eu',
    encrypted: true
});


/*const connectionString = 'postgres://postgres:lukatoni@localhost:5432/postgres'
const client = new Client(connectionString)
if (client.connect()) {
    console.log('connected')
} else {
    console.log('not connected')
}

/*const query = client.query('LISTEN newtestevent');
client.on('notification', async (msg) => {
    if (msg.channel) {
        console.log(msg.channel)
    }
    console.log('no message came thru')
})*/