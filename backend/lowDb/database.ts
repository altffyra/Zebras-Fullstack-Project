import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import {MenuItems, Cart, User, Order } from './dbinterface'

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

menudb.data ||= { menu: [] } 
userdb.data ||= { users: [] }
orderdb.data ||= { orders: [] }


async function lol(){
console.log('lol')
return "lol"
}



const { menu:MenuInterface} = menudb.data
const { users:UsersInterface } = userdb.data
const { orders:OrdersInterface } = orderdb.data


// PUSHA IN OBJECT
// menu.push('hello world')




await userdb.write()
await menudb.write()
await orderdb.write()


export {lol}