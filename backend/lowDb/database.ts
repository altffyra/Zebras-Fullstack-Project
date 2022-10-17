import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import {MenuItems, CartProps, User, Order, headersType } from './dbinterface'
import menuInit from '../menudata.json' assert {type: "json"}
import ordersInit from '../orderdb.json' assert {type: "json"}

import dayjs from 'dayjs'
dayjs()

const started= dayjs().format('YYYY-MM-DD HH:mm')
console.log(started)

const __dirname = dirname(fileURLToPath(import.meta.url));

const menufile = join(__dirname, 'menudb.json')
const userfile = join(__dirname, 'userdb.json')
const orderfile = join(__dirname, 'orderdb.json')

const menuadapter = new JSONFile(menufile)
const useradapter = new JSONFile(userfile)
const orderadapter = new JSONFile(orderfile)

const menudb:any = new Low(menuadapter)
const userdb:any = new Low(useradapter)
const orderdb:any = new Low(orderadapter)
await userdb.read()
await menudb.read()
await orderdb.read()

menudb.data ||= { menu: menuInit.menu } 
userdb.data ||= { users: [] }


orderdb.data ||= { orders: ordersInit.orders }



async function lol(){
console.log('lol')
return "lol"
}

async function getMenu(){
    const menureply = await menudb.data
    return menureply
}

async function getOrders(){
    const orderreply = await orderdb.data
    return orderreply
}

async function authenticateLogin(ID:any){
    console.log("lols")
    const authreply = await userdb.data
    let filter = authreply.users.filter((user:User) => user.accountId == ID.accountID);
    console.log("lols")
    if (filter.admin== true)
    return authreply
    else
    return []
}


const menu:MenuItems[] = menudb.data
const users:User[] = userdb.data
const orders:Order[] = orderdb.data


// PUSHA IN OBJECT
// menu.push('hello world')




await userdb.write()
await menudb.write()
await orderdb.write()


export {lol, getMenu, getOrders, authenticateLogin}