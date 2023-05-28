import { useEffect, useState, useRef, useContext } from 'react'
import {  onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase.config'
import UserContext from '../context/UserContext'

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const {dispatch}= useContext(UserContext)
  const isMounted = useRef(true)

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // console.log('user email:' , user.email);
          // console.log('user uuid:' , user.uid);
          dispatch({type: 'SET_CURRENT_USER', email: user.email, id:user.uid})
          setLoggedIn(true)
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