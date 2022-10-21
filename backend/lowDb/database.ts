import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';
import { User, Schema, Order, LoginCreds } from './dbinterface';
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

      if (updatedOrder.orderPlaced != undefined)
            //@ts-ignore
          {  if(updatedOrder.orderPlaced < db.data.orders[id].orderCompleted || db.data.orders[id].locked === true) {
            return false
            }
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
    let filter: User[] = authreply.filter((user:User) => user.accountId == ID);

    if (filter != undefined && filter[0].admin == true) {
      return filter;
    } else {
      return [];
    }
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
    let userExist = db.data.users.filter((user) => user.email === userData.email || user.name === userData.name)

      console.log('userExist', userExist)
    return userExist
}    

export async function findAccount(userData:LoginCreds) {
      db.read()
    if( !db.data ) {
      db.data = defaultData
      }
      let filterAccount = db.data.users.filter((user)=> user.name === userData.name && user.password === userData.password)
      return filterAccount
}

export async function createOrder(orderData: Order) {
      await db.read()
      if ( !db.data ) {
            db.data = defaultData
      }
      db.data.orders.push(orderData)
      await db.write();
}

export async function getUser(accountId: string) {
      
}

export async function updateUser(accountId:string, updatedUser:User) {
      if( !db.data ) {
            db.data = defaultData
      }

      const userIndex: number = db.data.users.findIndex(user => user.accountId === accountId)
      if(userIndex == -1) {
            return false
      }
      
      db.data.users[userIndex] = updatedUser; 
      await db.write()
      return true
}



// // PUSHA IN OBJECT
// // menu.push('hello world')






export {getMenu, getOrders, authenticateLogin, checkOrder, updateOrder, getUsers }
// newUser, findUser, getUsers
export default db