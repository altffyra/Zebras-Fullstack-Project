import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';
import { User, Schema, Order } from './dbinterface';
import { data as defaultData } from '../defaultData.js';
import dayjs from 'dayjs';


export const started = dayjs().format('YYYY-MM-DD HH:mm');
export const newtime = dayjs().add(23, 'minutes');
export const completed = newtime.toString()




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

async function checkOrder(id: string){
      if( !db.data ) {
            db.data = defaultData
      }
      const foundIndex = db.data.orders.findIndex(order => order.id === id)
      return foundIndex

}

async function updateOrder(updatedOrder: Order, id:number) {
      if( !db.data ) {
            db.data = defaultData
      }
      if(updatedOrder.orderPlaced < db.data.orders[id].orderCompleted || db.data.orders[id].locked === true) {
            return false
      }
      updatedOrder.orderPlaced = started;      
      db.data.orders[id] = updatedOrder;  
      await db.write()
      return true
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

export async function createOrder(orderData: Order) {
      await db.read()
      if ( !db.data ) {
            db.data = defaultData
      }
      db.data.orders.push(orderData)
      await db.write();
}

// set userComment, locked = false, completed = false, orderPlaced = dayjs, orderComplete = randomfunc, id = uuid


// // PUSHA IN OBJECT
// // menu.push('hello world')






export {getMenu, getOrders, authenticateLogin, checkOrder, updateOrder }
// newUser, findUser, getUsers
export default db