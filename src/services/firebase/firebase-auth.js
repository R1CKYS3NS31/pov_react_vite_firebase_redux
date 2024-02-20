import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { firebaseApp } from "./firebase-config";

const auth = getAuth(firebaseApp);

// Sign-in PoV in Firebase using popup auth and Google as the identity provider.
const signInWithGoogleAUth = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

// sign-out of PoV
const signOutUser = async () => {
  await signOut(auth);
};

// Returns true if a user is signed-in.
const isUserSignedIn = () => {
  return !!auth.currentUser;
};

// Triggers when the auth state change for instance when the user signs-in or signs-out.
export const currentUser = () =>
  onAuthStateChanged(auth, (user) => {
    if (user) {
      return user;
    } else {
      return null;
    }
  });
