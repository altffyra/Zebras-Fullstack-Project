import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import {MenuItem, CartProps, User, Order, headersType, Schema } from './dbinterface'
import menuInit from '../menudata.json' assert {type: "json"}
import ordersInit from '../orderdb.json' assert {type: "json"}
import { data as defaultData } from '../defaultData.js'

import dayjs from 'dayjs'
dayjs()

const started= dayjs().format('YYYY-MM-DD HH:mm')
console.log(started)
// import userInit from '../userdata.json' assert {type: "json"}

const __dirname = dirname(fileURLToPath(import.meta.url));

// const menufile = join(__dirname, 'menudb.json')
// const userfile = join(__dirname, 'userdb.json')
// const orderfile = join(__dirname, 'orderdb.json')

// const menuadapter = new JSONFile(menufile)
// // const useradapter = new JSONFile<UserData>(userfile)
// const useradapter = new JSONFile(userfile)
// const orderadapter = new JSONFile(orderfile)

// const menudb:any = new Low(menuadapter)
// // const userdb = new Low<UserData>(useradapter)
// const userdb:any = new Low(useradapter)
// const orderdb:any = new Low(orderadapter)
// await userdb.read()
// await menudb.read()
// await orderdb.read()

const file = join(__dirname, 'db.json')
const adapter = new JSONFile<Schema>(file)
const db = new Low(adapter)



// menudb.data ||= { menu: menuInit.menu } 
// userdb.data ||= { users: [] }
// orderdb.data ||= { orders: ordersInit.orders }

await db.read()
if( !db.data ) {
      db.data = defaultData
      db.write()
}
const usersShorthand:User[] = db.data.users




// async function lol(){
// console.log('lol')
// return "lol"
// }
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
    const orderreply = await db.data.orders
    return orderreply
}

// async function authenticateLogin(ID:any){
//     console.log("lols")
//     if(!db.data) {
//         db.data = defaultData
//     }
//     const authreply = await db.data
//     let filter = authreply.users.find((user:User) => user.accountId == ID.accountID);
//     console.log("lols")
//     if (filter.admin== true)
//     return authreply
//     else
//     return []
// }

// // USER FUNCTIONS
async function getUsers() {
    await db.read()
    if( !db.data ) {
      db.data = defaultData
}
    const allUsers: User[] = db.data.users
    console.log('getUsers', allUsers)
    return allUsers
}
export async function createAccount(userData:User) {
      await db.read()
      if( !db.data ) {
            db.data = defaultData
      }
      db.data.users.push(userData)
      await db.write()
}

export async function findUser(userData:User) {
    db.read()
    if( !db.data ) {
      db.data = defaultData
      }
    let userExist = db.data.users.find((user) => user.email === userData.email || user.name === userData.name)
    return userExist
}     

// const menu:MenuItem[] = menudb.data
// const orders:Order[] = orderdb.data


// // PUSHA IN OBJECT
// // menu.push('hello world')




// await userdb.write()
// await menudb.write()
// await orderdb.write()


// export {lol, getMenu, getOrders, authenticateLogin, newUser, findUser, getUsers}
export default db