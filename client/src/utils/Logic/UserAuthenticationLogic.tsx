import { auth } from "../../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

interface AuthResponse {
  email: string;
  token: string;
}

const signUp = async (
  email: string,
  password: string
): Promise<AuthResponse | null> => {
  try {
    const userCredintial = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredintial.user.getIdToken();
    return { email: userCredintial.user.email as string, token };
  } catch (error) {
    console.error("Sign-up error: " + error);
    return null;
  }
};

const logIn = async (
  email: string,
  password: string
): Promise<AuthResponse | null> => {
  try {
    const userCredintial = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredintial.user.getIdToken();
    return { email: userCredintial.user.email as string, token };
  } catch (error) {
    console.log("Login error: ", error);
    return null;
  }
};

export const UserAuthentication = {
  signUp,
  logIn,
};
