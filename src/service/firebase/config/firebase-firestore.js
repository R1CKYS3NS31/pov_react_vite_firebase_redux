import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  getCountFromServer,
} from "firebase/firestore";
import { firebaseApp } from "./firebase-config";


const firestore = getFirestore(firebaseApp);

/**
 * Save data to a collection.
 */
export const saveDocData = async (
  collectionName,
  pathSegment = "",
  docData,
) => {
  const colRef = pathSegment
    ? collection(firestore, collectionName, pathSegment)
    : collection(firestore, collectionName);

  return await addDoc(colRef, {
    ...docData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
    .then((docRef) => ({
      id: docRef.id,
      path: docRef.path,
    }))
    .catch((error) => {
      throw error;
    });
};

/**
 * Load documents from a collection with limit and optional filters.
 * Simulates offset pagination by fetching up to the requested page.
 */
export const loadDocsData = async (collectionName, page = 0, size = 12) => {
  const colRef = collection(firestore, collectionName);
  
  // Get total count
  const snapshotCount = await getCountFromServer(colRef);
  const totalElements = snapshotCount.data().count;
  const totalPages = Math.ceil(totalElements / size);

  // Fetch documents up to the requested page
  const fetchLimit = (page + 1) * size;
  const q = query(colRef, limit(fetchLimit));

  return await getDocs(q)
    .then((snapshot) => {
      // Slice the array to return only the documents for the current page
      const startIndex = page * size;
      const pageDocs = snapshot.docs.slice(startIndex);

      return {
        size: pageDocs.length,
        empty: pageDocs.length === 0,
        content: pageDocs.map((doc) => ({
          id: doc.id,
          exists: doc.exists(),
          ...doc.data(),
        })),
        totalPages,
        totalElements,
        number: page,
      };
    })
    .catch((error) => {
      throw error;
    });
};


/**
 * Load a single document by ID.
 */
export const loadDocDataById = async (
  collectionName,
  docId,
  ...pathSegments
) => {
  const docRef = doc(firestore, collectionName, docId, ...pathSegments);

  return await getDoc(docRef)
    .then((docSnap) => ({
      id: docSnap.id,
      exists: docSnap.exists(),
      ...docSnap.data(),
    }))
    .catch((error) => {
      throw error;
    });
};

/**
 * Load documents with a simple WHERE filter.
 * Simulates offset pagination by fetching up to the requested page.
 */
export const loadDocsDataWhere = async (
  collectionName,
  page = 0,
  size = 12,
  filters = [{ field: "", operator: "==", value: "" }],
) => {
  const colRef = collection(firestore, collectionName);
  const filterQuery = filters.map(({ field, operator, value }) => where(field, operator, value));
  const qBase = query(colRef, ...filterQuery);

  // Get total count for the filtered query
  const snapshotCount = await getCountFromServer(qBase);
  const totalElements = snapshotCount.data().count;
  const totalPages = Math.ceil(totalElements / size);

  // Fetch documents up to the requested page
  const fetchLimit = (page + 1) * size;
  const qLimit = query(colRef, ...filterQuery, limit(fetchLimit));

  return await getDocs(qLimit)
    .then((snapshot) => {
      // Slice the array to return only the documents for the current page
      const startIndex = page * size;
      const pageDocs = snapshot.docs.slice(startIndex);

      return {
        size: pageDocs.length,
        empty: pageDocs.length === 0,
        content: pageDocs.map((docSnap) => ({
          id: docSnap.id,
          exists: docSnap.exists(),
          ...docSnap.data(),
        })),
        totalPages,
        totalElements,
        number: page,
      };
    })
    .catch((error) => {
      throw error;
    });
};


/**
 * Set (overwrite/merge) a document by ID.
 */
export const setDocData = async (
  collectionName,
  docId,
  docData = {},
  ...pathSegments
) => {
  const docRef = doc(firestore, collectionName, docId, ...pathSegments);

  return await setDoc(
    docRef,
    {
      ...docData,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  )
    .then(() => ({
      id: docId,
      success: true,
    }))
    .catch((error) => {
      throw error;
    });
};

/**
 * Update a document by ID.
 */
export const updateDocData = async (
  collectionName,
  docId,
  docData = {},
  ...pathSegments
) => {
  const docRef = doc(firestore, collectionName, docId, ...pathSegments);

  return await updateDoc(docRef, {
    ...docData,
    updatedAt: serverTimestamp(),
  })
    .then(() => ({
      id: docId,
      success: true,
    }))
    .catch((error) => {
      throw error;
    });
};

/**
 * Delete a document by ID.
 */
export const deleteDocData = async (collectionName, docId, ...pathSegments) => {
  const docRef = doc(firestore, collectionName, docId, ...pathSegments);

  return await deleteDoc(docRef)
    .then(() => ({
      id: docId,
      success: true,
    }))
    .catch((error) => {
      throw error;
    });
};

/**
 * Get total count of documents in a collection.
 */
export const getDocsCount = async (collectionName) => {
  const colRef = collection(firestore, collectionName);
  const snapshot = await getCountFromServer(colRef);
  return snapshot.data().count;
};

