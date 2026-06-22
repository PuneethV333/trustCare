import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { Auth, googleAuthProvider } from "../config/firebase.config"

export const signInViaEmail = async (email: string, password: string) => {
    await signOut(Auth)
    const cred = await signInWithEmailAndPassword(Auth, email, password)
    return cred.user
}

export const signUpViaEmail = async (email:string,password:string) => {
    await signOut(Auth)
    const cred = await createUserWithEmailAndPassword(Auth,email,password)
    return cred.user
}

export const signInViaGoogle = async () => {
    await signOut(Auth)
    const cred = await signInWithPopup(Auth,googleAuthProvider)
    return cred.user
}