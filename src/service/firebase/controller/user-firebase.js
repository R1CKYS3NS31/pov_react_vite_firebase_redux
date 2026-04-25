import {
  deleteDocData,
  loadDocDataById,
  loadDocsData,
  setDocData,
  updateDocData,
  saveDocData,
} from "../config/firebase-firestore";

const collectionName = "users";

/**
 * Create a new user with generated ID.
 */
export const saveUserFirebase = async (user = {}) => {
  const { displayName, name, email, displayPicture, isUser } = user;

  const userData = {
    name: {
      first: name?.first || displayName?.split(" ")[0] || "",
      last: name?.last || displayName?.split(" ").slice(1).join(" ") || "",
    },
    displayName: displayName || "",
    email: email || "",
    description: user.description || "",
    displayPicture: displayPicture || "",
    isUser: isUser ?? true,
  };

  return await saveDocData(collectionName, "", userData)
    .then(async (snapshot) => await getUserFirebase(snapshot.id))
    .catch((error) => {
      console.warn(`Failed to save user: `, error);
      throw error;
    });
};

/**
 * Create or overwrite user with specific UID.
 */
export const setUserFirebase = async (user = {}) => {
  const { uid, displayName, name, email, displayPicture, isUser } = user;

  if (!uid)
    return Promise.reject(new Error("UID is required for setUserFirebase"));

  const userData = {
    name: {
      first: name?.first || displayName?.split(" ")[0] || "",
      last: name?.last || displayName?.split(" ").slice(1).join(" ") || "",
    },
    displayName: displayName || "",
    email: email || "",
    description: user.description || "",
    displayPicture: displayPicture || "",
    isUser: isUser ?? true,
  };

  return await setDocData(collectionName, uid, userData)
    .then(async () => await getUserFirebase(uid))
    .catch((error) => {
      console.warn(`Failed to set user: `, error);
      throw error;
    });
};

/**
 * Get all users.
 */
export const getUsersFirebase = async () => {
  return await loadDocsData(collectionName).catch((error) => {
    console.warn(`Failed to get users: `, error);
    throw error;
  });
};

/**
 * Get single user by ID.
 */
export const getUserFirebase = async (userId) => {
  if (!userId) return Promise.reject(new Error("User ID is required"));

  return await loadDocDataById(collectionName, userId).catch((error) => {
    console.warn(`Failed to get user ${userId}: `, error);
    throw error;
  });
};

/**
 * Update user details.
 */
export const updateUserFirebase = async (userId, user) => {
  if (!userId) return Promise.reject(new Error("User ID is required"));

  return await updateDocData(collectionName, userId, user)
    .then(async () => await getUserFirebase(userId))
    .catch((error) => {
      console.warn(`Failed to update user: `, error);
      throw error;
    });
};

/**
 * Delete user.
 */
export const deleteUserFirebase = async (userId) => {
  if (!userId) return Promise.reject(new Error("User ID is required"));

  return await deleteDocData(collectionName, userId).catch((error) => {
    console.warn(`Failed to delete user: `, error);
    throw error;
  });
};
