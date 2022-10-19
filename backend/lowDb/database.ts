import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import { User, Schema, Order } from './dbinterface'
import { data as defaultData } from '../defaultData.js'

import dayjs from 'dayjs'
dayjs()
const started= dayjs().format('YYYY-MM-DD HH:mm')
console.log(started)

const __dirname = dirname(fileURLToPath(import.meta.url));


const file = join(__dirname, 'db.json')
const adapter = new JSONFile<Schema>(file)
const db = new Low(adapter)
await db.read()



await db.read()
if( !db.data ) {
      db.data = defaultData
      db.write()
}



async function getMenu(){
      if( !db.data ) {
            db.data = defaultData
      }
    const menureply = await db.data.menu
    return menureply
}

async function getOrders(){
      if( !db.data ) {
            db.data = defaultData
      }
    const orderreply:Order[] = await db.data.orders
    return orderreply
}

async function authenticateLogin(ID:any){
    if(!db.data) {
        db.data = defaultData
    }
    const authreply:User[] = await db.data.users
    let filter = authreply.find((user:User) => user.accountId == ID.accountID);
    if (filter != undefined && filter.admin == true)
    return authreply
    else
    return []
}

// USER FUNCTIONS
// async function getUsers() {
//     await db.read()
//     const allUsers:User[] = db.data.users
//     console.log('getUsers', allUsers)
//     return allUsers
// }
// async function newUser(userData:User) {
//     await db.read()
//     const result = await db.data.users.push(userData)
//     await userdb.write()
//     return result
// }
// //
// async function findUser(userData:User) {
//     db.read()
//     let userExist: User = db.data.users.find((user:User) => user.name === userData.name)
//     console.log('userExist i db:', userExist)
//     return userExist
// }     



// // PUSHA IN OBJECT
// // menu.push('hello world')






export {getMenu, getOrders, authenticateLogin, }
// newUser, findUser, getUsers
export default db