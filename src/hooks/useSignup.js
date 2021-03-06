import { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'


export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName) => {
    setError(null)
    setIsPending(true)

    try {
      // 

      // signup
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)


      if (!userCredential) {
        throw new Error('Could not complete signup')
      }

      // add display name to user
      updateProfile(auth.currentUser, { displayName })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: userCredential.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }

    }
    catch (err) {
      if (!isCancelled) {
        console.log(err.message)
        setError(err.message)
        setIsPending(false)
      }

    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}