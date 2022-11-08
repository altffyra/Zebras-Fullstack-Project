import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";
import {
  User,
  Schema,
  Order,
  LoginCreds,
  ShortUniqueIdOptions,
} from "./dbinterface";
import { data as defaultData } from "../defaultData.js";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import tz from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(tz);

const timeZone = dayjs.tz.guess();
import ShortUniqueId from "short-unique-id";

const DEFAULT_OPTIONS: ShortUniqueIdOptions = {
  dictionary: "alpha_upper",
  length: 10,
};
const uid = new ShortUniqueId(DEFAULT_OPTIONS);

const __dirname = dirname(fileURLToPath(import.meta.url));

const file = join(__dirname, "db.json");
const adapter = new JSONFile<Schema>(file);
const db = new Low(adapter);

await db.read();
if (!db.data) {
  db.data = defaultData;
  db.write();
}

async function getMenu() {
  if (!db.data) {
    db.data = defaultData;
  }
  const menureply = await db.data.menu;
  return menureply;
}

async function getOrders() {
  if (!db.data) {
    db.data = defaultData;
  }
  const orderCopy = [...db.data.orders];
  orderCopy.forEach((order) => {
    if (order.orderCompleted) {
      if (
        order.orderCompleted <
        dayjs().tz(timeZone).tz("Europe/Stockholm").format("YYYY-MM-DD HH:mm")
      ) {
        order.locked = true;
      }
    }
  });

  db.data.orders = orderCopy;
  await db.write();

  const orderreply: Order[] = db.data.orders;
  return orderreply;
}

async function checkOrder(id: string) {
  if (!db.data) {
    db.data = defaultData;
  }
  const foundIndex = db.data.orders.findIndex((order) => order.id === id);
  return foundIndex;
}

async function updateOrder(updatedOrder: Order, id: number) {
  if (!db.data) {
    db.data = defaultData;
  }

  const orderToUpdate: Order = db.data.orders[id];
  if (updatedOrder.orderPlaced != undefined && orderToUpdate.orderCompleted) {
    if (
      updatedOrder.orderPlaced > orderToUpdate.orderCompleted ||
      db.data.orders[id].locked === true
    ) {
      db.data.orders[id].locked = true;
      await db.write();
      return false;
    }
  }

  updatedOrder.orderPlaced = dayjs()
    .tz(timeZone)
    .tz("Europe/Stockholm")
    .format("YYYY-MM-DD HH:mm");
  db.data.orders[id] = updatedOrder;
  await db.write();
  return true;
}

async function adminUpdateOrder(updatedOrder: Order, id: number) {
  if (!db.data) {
    db.data = defaultData;
  }

  db.data.orders[id] = updatedOrder;
  await db.write();
  return db.data.orders;
}

async function authenticateLogin(ID: string) {
  if (!db.data) {
    db.data = defaultData;
  }

  const authreply: User[] = [...db.data.users];
  let filter: User[] | undefined = authreply.filter(
    (user: User) => user.accountId == ID
  );

  if (filter.length > 0) {
    if (filter[0].admin) {
      if (filter != undefined && filter[0].admin == true) {
        return filter;
      } else {
        return [];
      }
    }
    return [];
  }
  return [];
}

// // USER FUNCTIONS
async function getUsers() {
  await db.read();
  if (!db.data) {
    db.data = defaultData;
  }
  const allUsers: User[] = db.data.users;
  return allUsers;
}
export async function createAccount(userData: User) {
  await db.read();
  if (!db.data) {
    db.data = defaultData;
  }
  db.data.users.push(userData);
  await db.write();
}

export async function findUser(userData: User) {
  db.read();
  if (!db.data) {
    db.data = defaultData;
  }
  let userExist = db.data.users.filter(
    (user) => user.email === userData.email || user.name === userData.name
  );

  return userExist;
}

export async function findAccount(userData: LoginCreds) {
  db.read();
  if (!db.data) {
    db.data = defaultData;
  }
  let filterAccount = db.data.users.filter(
    (user) => user.name === userData.name && user.password === userData.password
  );
  return filterAccount;
}

export async function checkUser(id: string) {
  await db.read();
  if (!db.data) {
    db.data = defaultData;
  }
  let found = db.data.users.find((user) => user.accountId === id);
  if (found) {
    return found;
  } else {
    return { success: false };
  }
}

export async function deleteOrder(ids: string) {
  await db.read();
  if (!db.data) {
    db.data = defaultData;
  }
  const orderfind: Order | undefined = db.data.orders.find(
    (orderid) => orderid.id == ids
  );
  if (orderfind) {
    if(orderfind.orderCompleted) {
      if (orderfind.orderCompleted < dayjs().tz(timeZone).tz("Europe/Stockholm").format("YYYY-MM-DD HH:mm")) {
        orderfind.locked = true;
        const index: number = db.data.orders.findIndex(order => order.id == ids)
        db.data.orders[index] = orderfind
        await db.write();
        return orderfind;
      } else if(orderfind.locked == true) {
        return orderfind;
      } else {
        const orderIndex: Order[] = db.data.orders.filter(
          (orderid) => orderid.id != ids
        );
          db.data.orders = orderIndex;
          await db.write();
          return orderfind;
      }
    }
  } else return undefined;
}

export async function createOrder(orderData: Order) {
  await db.read();
  if (!db.data) {
    db.data = defaultData;
  }
  db.data.orders.push(orderData);
  await db.write();
}

export async function getUser(accountId: string) {
  await db.read();
  if (!db.data) {
    db.data = defaultData;
  }

  const userIndex: number = db.data.users.findIndex(
    (user) => user.accountId === accountId
  );
  if (userIndex == -1) {
    return false;
  }
  return db.data.users[userIndex];
}

export async function updateUser(accountId: string, updatedUser: User) {
  if (!db.data) {
    db.data = defaultData;
  }
  const userIndex: number = db.data.users.findIndex(
    (user) => user.accountId === accountId
  );
  if (userIndex == -1) {
    return false;
  }

  db.data.users[userIndex] = updatedUser;
  await db.write();
  return true;
}



export async function createOrderInfo() {
  const randomNum: number = Math.ceil(Math.random() * 30);

  const orderInfo = {
    started: dayjs()
      .tz(timeZone)
      .tz("Europe/Stockholm")
      .format("YYYY-MM-DD HH:mm"),
    // completed: dayjs()
    //   .tz(timeZone)
    //   .tz("Europe/Stockholm")
    //   .add(randomNum, "minutes")
    //   .format("YYYY-MM-DD HH:mm"),
    completed: dayjs()
    .tz(timeZone)
    .tz("Europe/Stockholm")
    .add(20, "seconds")
    .format("YYYY-MM-DD HH:mm"),
    id: uid(),
  };

  return orderInfo;
}

export {
  getMenu,
  getOrders,
  authenticateLogin,
  checkOrder,
  updateOrder,
  getUsers,
  adminUpdateOrder,
};

export default db;
