import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  User
} from "firebase/auth";
import { auth } from "../firebase/config";

export async function register(
  email: string,
  password: string,
  fullName: string
): Promise<User> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: fullName });
  return userCredential.user;
}

export async function login(email: string, password: string): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function logout(): Promise<void> {
  await signOut(auth);
}
