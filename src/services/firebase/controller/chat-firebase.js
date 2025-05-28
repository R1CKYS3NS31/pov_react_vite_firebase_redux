import {
  saveDocData,
  deleteDocData,
  loadDocDataById,
  loadDocsData,
  setDocData,
  loadDocsDataWhere,
  updateDocData,
} from "../config/firebase-firestore";

const docName = "chats";

export const saveChatFirebase = async (chat = {}) => {
  try {
    const { createdBy, name, members, description, photoUrl } = chat;
    const chatData = {
      // isGroup: isGroup || false,
      name: name,
      createdBy: createdBy, // uid
      members: members, // [uids]
      description: description,
      photoUrl: photoUrl || "https://source.unsplash.com/random",
    };

    return await saveDocData(docName, "", chatData);
  } catch (error) {
    throw error;
  }
};

export const getChatsFirebase = async () => {
  try {
    return await loadDocsData(docName);
  } catch (error) {
    throw error;
  }
};
// todo : get chats where user is member
// export const getChatsByOwnerFirebase = async (senderId) => {
//   try {
//     return await loadDocsDataWhere(docName, 12, {
//       field: "sender",
//       value: senderId,
//     });
//   } catch (error) {
//     throw error;
//   }
// };

export const getChatFirebase = async (chatId) => {
  try {
    return await loadDocDataById(docName, chatId, "")
      .then((chatSnapshot) => {
        return {
          id: chatSnapshot.id,
          exists: chatSnapshot.exists(),
          ...chatSnapshot.data(),
        };
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

export const setChatFirebase = async (chatId, chat) => {
  try {
    const { createdBy, name, members, description, photoUrl } = chat;
    const chatData = {
      // isGroup: isGroup || false,
      name: name,
      createdBy: createdBy, // uid
      members: members, // [uids]
      description: description,
      photoUrl: photoUrl || "https://source.unsplash.com/random",
    };
    return await setDocData(docName, chatId, "", chatData);
  } catch (error) {
    throw error;
  }
};

export const updateChatFirebase = async (chatId, chat) => {
  try {
    const { name, members, description, photoUrl } = chat;
    const chatData = {
      name: name,
      members: members, // [uids]
      description: description,
      photoUrl: photoUrl || "https://source.unsplash.com/random",
    };
    return await updateDocData(docName, chatId, "", chatData);
  } catch (error) {
    throw error;
  }
};

export const deleteChatFirebase = async (chatId) => {
  try {
    return await deleteDocData(docName, chatId);
  } catch (error) {
    throw error;
  }
};
