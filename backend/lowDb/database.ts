import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import {MenuItems, Cart, User, Order } from './dbinterface'
import menuInit from '../data.json' assert {type: "json"}

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

menudb.data ||= { menu: menuInit.menu } 
userdb.data ||= { users: [] }
orderdb.data ||= { orders: [] }


async function lol(){
console.log('lol')
return "lol"
}

async function getMenu(){
    const menureply = await menudb.data
    return menureply
}



const menu:MenuItems[] = menudb.data
const users:User[] = userdb.data
const orders:Order[] = orderdb.data


// PUSHA IN OBJECT
// menu.push('hello world')




await userdb.write()
await menudb.write()
await orderdb.write()


export {lol, getMenu}