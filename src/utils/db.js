import {connect, connection} from 'mongoose'

const conn ={
    isConnected: false
}

export async function connectDB(params) {
    if (conn.isConnected) return;

    const db = await connect('mongodb+srv://admin:oBGJL5NSsrjjin7i@cluster0.tnvye.mongodb.net/nextmongocrud')
    conn.isConnected = db.connections[0].readyState
}

connection.on('connected', () => {
    console.log('mongo is connected')
})
connection.on('error', (err) => {
    console.log('mongo error: ' + err)
})