import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase/config'


export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const signup = async (email, password, displayName) => {
    setError(null)
    setIsPending(true)

    try {
      // 

      // signup
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log(userCredential.user)

      if (!userCredential) {
        throw new Error('Could not complete signup')
      }

      // add display name to user
      updateProfile(auth.currentUser, { displayName })

      setIsPending(false)
      setError(null)
    }
    catch (err) {
      console.log(err.message)
      setError(err.message)
      setIsPending(false)
    }
  }

  return { signup, error, isPending }
}