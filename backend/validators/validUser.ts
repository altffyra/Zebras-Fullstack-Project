import { User, Guest } from "../lowDb/dbinterface";


export function isValidUser(userData:User) {
     
      let userObj = {
            name: true,
            email: true,
            password: true,
            phoneNumber: true,
            accountId: true
      }
      if( userData.hasOwnProperty('name') ) {
            if((typeof userData.name !== 'string') || userData.name === '') {
                  userObj.name = false
            }
      } else {
            return userObj.name = false
      }
      if( userData.hasOwnProperty('email') ) {
            if((typeof userData.email !== 'string') || userData.email === '') {
                  userObj.email = false
            }
      } else {
            return userObj.email = false
      }
      if( userData.hasOwnProperty('accountId') ) {
            if((typeof userData.accountId !== 'string') || userData.accountId === '') {
                  userObj.accountId = false
            } 
      } else {
            return userObj.accountId = false
      }
      if( userData.hasOwnProperty('phoneNumber') ) {
            if((typeof userData.phoneNumber !== 'string') || userData.phoneNumber === '') {
                  userObj.phoneNumber = false
            }
      } else {
            return userObj.phoneNumber = false
      }
      if( userData.hasOwnProperty('password') ) {
            if((typeof userData.password !== 'string') || userData.password === '') {
                  userObj.password = false
            }
      } else {
            return userObj.password = false
      }
      return userObj
}

export function isValidGuest(guestData: Guest) {
      if( guestData.hasOwnProperty('name') ) {
            if((typeof guestData.name !== 'string') || guestData.name === '') {
                  return false
            }
      } else {
            return false
      }
      if( guestData.hasOwnProperty('email') ) {
            if((typeof guestData.email !== 'string') || guestData.email === '') {
                  return false
            }
      } else {
            return false
      }
      if( guestData.hasOwnProperty('phoneNumber') ) {
            if((typeof guestData.phoneNumber !== 'string') || guestData.phoneNumber === '') {
                  return false
            }
      } else {
            return false
      }
      return true
}