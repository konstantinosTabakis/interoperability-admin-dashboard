import { useEffect, useState, useRef, useContext } from 'react'
import {  onAuthStateChanged } from 'firebase/auth'
import { auth } from '../db/firebase.config'
import UserContext from '../context/UserContext'
import { getUser } from '../db/db-services'

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const {dispatch, currentUserRole}= useContext(UserContext)
  const isMounted = useRef(true)

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          dispatch({type: 'SET_CURRENT_USER', email: user.email, id:user.uid})
          setLoggedIn(true)
          
          if(!currentUserRole){
            const response = await getUser(user.uid)
            dispatch({type: 'SET_CURRENT_USER_ROLE', role: response.role})
          }

        }
        setCheckingStatus(false)
      })
    }

    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  return { loggedIn, checkingStatus }
}