import {
  saveDocData,
  deleteDocData,
  loadDocDataById,
  loadDocsData,
  setDocData,
  loadDocsDataWhere,
  updateDocData,
} from "../config/firebase-firestore";
import { getUserFirebase } from "./user-firebase";

const collectionName = "povs";

/**
 * Save a new PoV and populate author.
 */
export const savePoVFirebase = async (pov = {}) => {
  const { title, description, points, author } = pov;
  const povData = {
    title: title || "",
    description: description || "",
    points: points || "", // points of view from the author - string
    author: author || "",
    published: false,
    likes: [],
    comments: [],
  };

  return await saveDocData(collectionName, "", povData)
    .then(async (snapshot) => await getPoVFirebase(snapshot.id))
    .catch((error) => {
      console.warn(`Failed to save PoV: `, error);
      throw error;
    });
};

/**
 * Get all PoVs with populated authors.
 */
export const getPoVsFirebase = async ({
  page = 0,
  size = 12,
  sortBy = "createdAt",
} = {}) => {
  return await loadDocsData(collectionName, page, size, sortBy)
    .then(async (snapshot) => {
      const populatePromises = snapshot.content.map((doc) => povPopulate(doc));
      return await Promise.all(populatePromises).then((populatedDocs) => ({
        ...snapshot,
        content: populatedDocs,
      }));
    })
    .catch((error) => {
      console.warn(`Failed to get PoVs: `, error);
      throw error;
    });
};

/**
 * Get published PoVs with populated authors.
 */
export const getPoVsPublishedFirebase = async ({
  page = 0,
  size = 12,
  sortBy = "createdAt",
} = {}) => {
  return await loadDocsDataWhere(
    collectionName,
    page,
    size,
    [
      {
        field: "published",
        operator: "==",
        value: true,
      },
    ],
    sortBy,
  )
    .then(async (snapshot) => {
      const populatePromises = snapshot.content.map((doc) => povPopulate(doc));
      return await Promise.all(populatePromises).then((populatedDocs) => ({
        ...snapshot,
        content: populatedDocs,
      }));
    })
    .catch((error) => {
      console.warn(`Failed to get published PoVs: `, error);
      throw error;
    });
};

/**
 * Search published PoVs by title.
 */
export const searchPoVsByTitleFirebase = async (
  title,
  { page = 0, size = 12, sortBy = "createdAt" } = {},
) => {
  return await loadDocsDataWhere(
    collectionName,
    page,
    size,
    [
      {
        field: "title",
        operator: ">=", // prefix search
        value: title,
      },
      {
        field: "title",
        operator: "<=",
        value: title + "\uf8ff",
      },
      {
        field: "published",
        operator: "==",
        value: true,
      },
    ],
    sortBy,
  )
    .then(async (snapshot) => {
      const populatePromises = snapshot.content.map((doc) => povPopulate(doc));
      return await Promise.all(populatePromises).then((populatedDocs) => ({
        ...snapshot,
        content: populatedDocs,
      }));
    })
    .catch((error) => {
      console.warn(`Failed to search PoVs by title: `, error);
      throw error;
    });
};

/**
 * Get my PoVs (published or not).
 */
export const getMyPoVsFirebase = async (
  authorId,
  { page = 0, size = 12, sortBy = "createdAt" } = {},
) => {
  return await loadDocsDataWhere(
    collectionName,
    page,
    size,
    [
      {
        field: "author",
        operator: "==",
        value: authorId,
      },
    ],
    sortBy,
  )
    .then(async (snapshot) => {
      const populatePromises = snapshot.content.map((doc) => povPopulate(doc));
      return await Promise.all(populatePromises).then((populatedDocs) => ({
        ...snapshot,
        content: populatedDocs,
      }));
    })
    .catch((error) => {
      console.warn(`Failed to get my PoVs: `, error);
      throw error;
    });
};

/**
 * Get PoVs by author.
 */
export const getPoVsByAuthorFirebase = async (
  authorId,
  { page = 0, size = 12, sortBy = "createdAt" } = {},
) => {
  return await loadDocsDataWhere(
    collectionName,
    page,
    size,
    [
      {
        field: "author",
        operator: "==",
        value: authorId,
      },
      {
        field: "published",
        operator: "==",
        value: true,
      },
    ],
    sortBy,
  )
    .then(async (snapshot) => {
      const populatePromises = snapshot.content.map((doc) => povPopulate(doc));
      return await Promise.all(populatePromises).then((populatedDocs) => ({
        ...snapshot,
        content: populatedDocs,
      }));
    })
    .catch((error) => {
      console.warn(`Failed to get PoVs by author: `, error);
      throw error;
    });
};

/**
 * Get a single PoV with populated author.
 */
export const getPoVFirebase = async (povId) => {
  return await loadDocDataById(collectionName, povId)
    .then(async (snapshot) => await povPopulate(snapshot))
    .catch((error) => {
      console.warn(`Failed to get PoV: `, error);
      throw error;
    });
};

/**
 * Update PoV.
 */
export const updatePoVFirebase = async (povId, pov) => {
  return await setDocData(collectionName, povId, pov)
    .then(async () => await getPoVFirebase(povId))
    .catch((error) => {
      console.warn(`Failed to update PoV: `, error);
      throw error;
    });
};

/**
 * Delete PoV.
 */
export const deletePoVFirebase = async (povId) => {
  return await deleteDocData(collectionName, povId).catch((error) => {
    console.warn(`Failed to delete PoV: `, error);
    throw error;
  });
};

export const likePoVFirebase = async (povId, userId) => {
  return await getPoVFirebase(povId)
    .then(async (pov) => {
      const updatedLikes = Array.from(new Set([...(pov.likes || []), userId]));
      return await updateDocData(
        collectionName,
        povId,
        {
          likes: updatedLikes,
        },
        "",
      )
        .then(async () => await getPoVFirebase(povId))
        .catch((error) => {
          console.warn(`Failed to get the liked PoV: `, error);
          throw error;
        });
    })
    .catch((error) => {
      console.warn(`Failed to get the PoV to like: `, error);
      throw error;
    });
};

export const unLikePoVFirebase = async (povId, userId) => {
  return await getPoVFirebase(povId)
    .then(async (pov) => {
      const updatedLikes = (pov.likes || []).filter((id) => id !== userId);
      return await updateDocData(
        collectionName,
        povId,
        {
          likes: updatedLikes,
        },
        "",
      )
        .then(async () => await getPoVFirebase(povId))
        .catch((error) => {
          console.warn(`Failed to update the unliked PoV: `, error);
          throw error;
        });
    })
    .catch((error) => {
      console.warn(`Failed to get the PoV to unlike: `, error);
      throw error;
    });
};

export const commentOnPoVFirebase = async (povId, userId, commentText) => {
  return await getPoVFirebase(povId)
    .then(async (pov) => {
      const newComment = {
        // id: crypto.randomUUID(),
        postedBy: userId,
        text: commentText,
        postedAt: Date.now(),
      };

      const updatedComments = [...(pov.comments || []), newComment];
      return await updateDocData(
        collectionName,
        povId,
        {
          comments: updatedComments,
        },
        "",
      )
        .then(async () => await getPoVFirebase(povId))
        .catch((error) => {
          console.warn(`Failed to update the commenting on PoV: `, error);
          throw error;
        });
    })
    .catch((error) => {
      console.warn(`Failed to get the PoV to comment on: `, error);
      throw error;
    });
};

export const uncommentPoVFirebase = async (povId, postedBy) => {
  return await getPoVFirebase(povId)
    .then(async (pov) => {
      const updatedComments = (pov.comments || []).filter(
        (comment) => comment.postedBy !== postedBy,
      );
      return await updateDocData(
        collectionName,
        povId,
        {
          comments: updatedComments,
        },
        "",
      )
        .then(async () => await getPoVFirebase(povId))
        .catch((error) => {
          console.warn(`Failed to update the uncommenting on PoV: `, error);
          throw error;
        });
    })
    .catch((error) => {
      console.warn(`Failed to get the PoV to uncomment on: `, error);
      throw error;
    });
};

/**
 * Helper to populate PoV author.
 */
const povPopulate = async (povData) => {
  if (!povData?.author) {
    return await Promise.resolve({
      ...povData,
      author: {},
    });
  }

  return await getUserFirebase(povData.author)
    .then(async (author) => {
      return await Promise.resolve({
        ...povData,
        author,
      });
    })
    .catch((error) => {
      console.warn(`Failed to load author ${povData.author}:`, error);
      return {
        ...povData,
        author: { id: povData.author }, // Return ID if fetch fails
      };
    });
};
