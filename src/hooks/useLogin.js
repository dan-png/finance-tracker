import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    // sign the user out
    try {

      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      if (!userCredential) {
        throw new Error('Could not complete Login')
      }

      // dispatch logout action
      dispatch({ type: 'LOGIN', payload: userCredential.user })
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }


    } catch (err) {
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

  return { login, isPending, error }
}