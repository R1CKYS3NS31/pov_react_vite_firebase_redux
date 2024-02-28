import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { firebaseApp } from "./firebase-config";
import { saveUserFirebase } from "./model/user-firebase";

const auth = getAuth(firebaseApp);

// Sign-in PoV in Firebase using popup auth and Google as the identity provider.
export const signInWithGoogleAUth = async () => {
  const provider = new GoogleAuthProvider();
  try {
    return await signInWithPopup(auth, provider);
  } catch (error) {
    throw error;
  }
};

// sign-up
export const signUpUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      // ...
      return userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      throw error;
    });
};

// sign-in
export const signInUserWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      // ...
      return userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw error;
    });
};

// sign-out of PoV
export const signOutFirebaseUser = async () => {
  try {
    return await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// Returns true if a user is signed-in.
export const isUserSignedIn = () => {
  return !!auth.currentUser;
};

// Triggers when the auth state change for instance when the user signs-in or signs-out.
export const currentUser = () => {
  return onAuthStateChanged(auth, (user) => {
    return user;
  });
};
const saveUserAccount = async () => {
  try {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { firstN, lastN } = user.displayName.split(" ");
        const signedInUser = {
          name: {
            first: firstN,
            last: lastN,
          },
          email: user.email,
        };
        await saveUserFirebase((user = signedInUser));
        return user;
      } else return null;
    });
  } catch (error) {
    throw error;
  }
};

 const updateUserProfile = async (user) => {
  if (currentUser) {
    return await updateProfile(currentUser(), {
      displayName: user.name.first + " " + user.name.last,
      photoURL: user.photoUrl,
    })
      .then((value) => {
        // Profile updated!
        // ...
        return value;
      })
      .catch((error) => {
        throw error;
      });
  } else {
    throw Error("please sign-in");
  }
};

const resetUserEmail = async (user) => {
  if (currentUser) {
    return await sendEmailVerification(currentUser)
      .then(async () => {
        // Email verification sent!
        // ...
        await updateEmail(currentUser, user.email)
          .then(() => {
            // Email updated!
            // ...
            return currentUser;
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
      })
      .catch((error) => {
        throw error;
      });
  } else {
    return Error("please sign-in");
  }
};

const resetUserPassword = async (user) => {
  if (currentUser) {
    return await sendEmailVerification(currentUser)
      .then(async () => {
        // Email verification sent!
        // ...
        return await sendPasswordResetEmail(auth, user.email)
          .then(async () => {
            // Password reset email sent!
            // ..
            return await updatePassword(currentUser, user.password)
              .then(() => {
                // Update successful.
                return currentUser;
              })
              .catch((error) => {
                // An error ocurred
                // ...
                throw error;
              });
          })
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => {
        throw error;
      });
  } else throw Error("please sign-in");
};

const deleteUserProfile = async () => {
  if (currentUser) {
    await deleteUser(currentUser)
      .then(() => {
        // User deleted.
      })
      .catch((error) => {
        // An error ocurred
        // ...
        throw error;
      });
  } else {
    return Error("please sign-in");
  }
};
