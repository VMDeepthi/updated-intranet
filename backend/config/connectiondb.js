import mysql from 'mysql2'
import 'dotenv/config'

// const db = mysql.createConnection({
//     host:'192.168.30.75',
//     user:'user',
//     password:'pass',
//     database:'ecart'   
// })
function keepAlive() { 
  console.log('re-connecting')
  db.ping();     
    
}
setInterval(keepAlive, 14400000); 

const db = mysql.createConnection({
    
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    database:process.env.DB_DATABASE,
    
    enableKeepAlive: true,
  keepAliveInitialDelay: 0,

})


export default db

