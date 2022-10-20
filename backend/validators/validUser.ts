import { User, Guest } from "../lowDb/dbinterface";

export function isValidUser(userData:User) {
      if( userData.hasOwnProperty('name') ) {
            if((typeof userData.name !== 'string') || userData.name === '') {
                  return false
            }
      } else {
            return false
      }
      if( userData.hasOwnProperty('email') ) {
            if((typeof userData.email !== 'string') || userData.email === '') {
                  return false
            }
      } else {
            return false
      }
      if( userData.hasOwnProperty('accountId') ) {
            if((typeof userData.accountId !== 'string') || userData.accountId === '') {
                  return false
            } 
      } else {
            return false
      }
      if( userData.hasOwnProperty('phoneNumber') ) {
            if((typeof userData.phoneNumber !== 'string') || userData.phoneNumber === '') {
                  return false
            }
      } else {
            return false
      }
      if( userData.hasOwnProperty('password') ) {
            if((typeof userData.password !== 'string') || userData.password === '') {
                  return false
            }
      } else {
            return false
      }
      return true
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