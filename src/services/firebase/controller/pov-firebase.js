import {
  saveDocData,
  deleteDocData,
  loadDocDataById,
  loadDocsData,
  setDocData,
  loadDocsDataWhere,
} from "../config/firebase-firestore";
import { getUserFirebase } from "./user-firebase";

const docName = "povs";

export const savePoVFirebase = async (pov = {}) => {
  try {
    const { title, points, author } = pov;
    const povData = {
      title: title,
      // subtitle: subtitle,
      points: points,
      author: author,
      likes: [],
      comments: [],
      published: false,
    };
    return await saveDocData(docName, "", povData);
  } catch (error) {
    throw error;
  }
};

export const getPoVsFirebase = async () => {
  try {
    const povSnapshots = await loadDocsData(docName);

    const povsWithAuthors = await Promise.all(
      povSnapshots.docs.map((povData) => {
        return getUserFirebase(povData.author)
          .then((author) => {
            const comments = povData.comments || [];

            return Promise.all(
              comments.map((comment) => {
                return getUserFirebase(comment.postedBy)
                  .then((user) => ({
                    ...comment,
                    postedBy: user,
                  }))
                  .catch((error) => {
                    console.warn(
                      `Failed to load postedBy user ${comment.postedBy}:`,
                      error
                    );
                    return comment;
                  });
              })
            ).then((commentsWithUsers) => ({
              id: povData.id,
              exists: true,
              ...povData,
              author,
              comments: commentsWithUsers,
            }));
          })
          .catch((error) => {
            console.warn(`Failed to load author ${povData.author}:`, error);
            return {
              id: povData.id,
              exists: true,
              ...povData,
              author: null,
              comments: povData.comments || [],
            };
          });
      })
    );

    return { ...povSnapshots, docs: povsWithAuthors };
  } catch (error) {
    throw error;
  }
};

// export const getPoVsByAuthorFirebase = async (authorId) => {
//   try {
//     return await loadDocsDataWhere(docName, 12, {
//       field: "author",
//       value: authorId,
//     });
//   } catch (error) {
//     throw error;
//   }
// };
export const getPoVsByAuthorFirebase = async (authorId) => {
  try {
    const povsByAuthorSnapshots = await loadDocsDataWhere(docName, 12, {
      field: "author",
      value: authorId,
    });
    const povsByAuthorWithAuthor = await Promise.all(
      povsByAuthorSnapshots.docs.map((povData) => {
        return getUserFirebase(povData.author)
          .then((author) => {
            const comments = povData.comments || [];
            return Promise.all(
              comments.map((comment) => {
                return getUserFirebase(comment.postedBy)
                  .then((user) => ({
                    ...comment,
                    postedBy: user,
                  }))
                  .catch((error) => {
                    console.warn(
                      `Failed to load postedBy user`,
                      error
                    );
                    return comment;
                  });
              })
            ).then((commentsWithUsers) => ({
              id: povData.id,
              exists: true,
              ...povData,
              author,
              comments: commentsWithUsers,
            }));
          })
          .catch((error) => {
            console.warn(`Failed to load author ${povData.author}:`, error);
            return {
              id: povData.id,
              exists: true,
              ...povData,
              author: null,
              comments: povData.comments || [],
            };
          });
      })
    );
    return {
      ...povsByAuthorSnapshots,
      docs: povsByAuthorWithAuthor,
    };
  } catch (error) {
    throw error;
  }
};

export const getPoVFirebase = async (povId) => {
  try {
    return await loadDocDataById(docName, povId, "")
      .then((povSnapshot) => {
        if (!povSnapshot.exists()) {
          return { exists: false, id: povId };
        }
        const povData = povSnapshot.data();

        return getUserFirebase(povData.author)
          .then((author) => {
            const comments = povData.comments || [];
            return Promise.all(
              comments.map((comment) => {
                return getUserFirebase(comment.postedBy)
                  .then((user) => ({
                    ...comment,
                    postedBy: user,
                  }))
                  .catch((error) => {
                    console.warn(
                      `Failed to load postedBy user ${comment.postedBy}:`,
                      error
                    );
                    return comment;
                  });
              })
            ).then((commentsWithUsers) => ({
              id: povSnapshot.id,
              exists: true,
              ...povData,
              author,
              comments: commentsWithUsers,
            }));
          })
          .catch((error) => {
            console.warn(`Failed to load author ${povData.author}:`, error);
            return {
              id: povData.id,
              exists: true,
              ...povData,
              author: null,
              comments: povData.comments || [],
            };
          });
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

export const updatePoVFirebase = async (povId, pov) => {
  try {
       return await setDocData(docName, povId, "", pov);
  } catch (error) {
    throw error;
  }
};

export const deletePoVFirebase = async (povId) => {
  try {
    return await deleteDocData(docName, povId);
  } catch (error) {
    throw error;
  }
};

export const likePoVFirebase = async (povId, userId) => {
  try {
    const pov = await getPoVFirebase(povId);
    if (!pov.exists) throw new Error("PoV not found");

    const updatedLikes = Array.from(new Set([...(pov.likes || []), userId]));
    return await setDocData(docName, povId, "", { likes: updatedLikes });
  } catch (error) {
    throw error;
  }
};

export const unLikePoVFirebase = async (povId, userId) => {
  try {
    const pov = await getPoVFirebase(povId);
    if (!pov.exists) throw new Error("PoV not found");

    const updatedLikes = (pov.likes || []).filter((id) => id !== userId);
    return await setDocData(docName, povId, "", { likes: updatedLikes });
  } catch (error) {
    throw error;
  }
};

export const commentOnPoVFirebase = async (povId, userId, commentText) => {
  try {
    const pov = await getPoVFirebase(povId);
    if (!pov.exists) throw new Error("PoV not found");

    const newComment = {
      // id: crypto.randomUUID(),
      postedBy: userId,
      text: commentText,
      postedAt: Date.now(),
    };

    const updatedComments = [...(pov.comments || []), newComment];
    return await setDocData(docName, povId, "", { comments: updatedComments });
  } catch (error) {
    throw error;
  }
};

export const uncommentPoVFirebase = async (povId, postedBy) => {
  try {
    const pov = await getPoVFirebase(povId);
    if (!pov.exists) throw new Error("PoV not found");

    const updatedComments = (pov.comments || []).filter(
      (comment) => comment.postedBy !== postedBy
    );
    return await setDocData(docName, povId, "", { comments: updatedComments });
  } catch (error) {
    throw error;
  }
};
