import {
  saveDocData,
  deleteDocData,
  loadDocDataById,
  loadDocsData,
  setDocData,
  loadDocsDataWhere,
  updateDocData,
} from "../config/firebase-firestore";

const docName = "messages";

export const saveMessageFirebase = async (message = {}) => {
  try {
    const { sender, chat, fileUrl, text, sentAt } = message;

    const messageData = {
      sender: sender, // uid
      chat: chat,
      fileUrl: fileUrl,
      text: text,
      sentAt: sentAt,
    };

    return await saveDocData(docName, "", messageData);
  } catch (error) {
    throw error;
  }
};

export const getMessagesFirebase = async () => {
  try {
    return await loadDocsData(docName);
  } catch (error) {
    throw error;
  }
};

export const getMessagesByChatFirebase = async (chatId) => {
  try {
    return await loadDocsDataWhere(
      docName,
      64,
      "chat.id",
      chatId,
      "createdAt",
      "asc"
    );
  } catch (error) {
    throw error;
  }
};

export const getMessagesBySenderFirebase = async (senderId) => {
  try {
    return await loadDocsDataWhere(
      docName,
      12,
      "sender.uid",
      senderId,
      "createdAt",
      "asc"
    );
  } catch (error) {
    throw error;
  }
};

export const getMessageFirebase = async (messageId) => {
  try {
    return await loadDocDataById(docName, messageId, "")
      .then((messageSnapshot) => {
        return {
          id: messageSnapshot.id,
          exists: messageSnapshot.exists(),
          ...messageSnapshot.data(),
        };
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

export const setMessageFirebase = async (messageId, message) => {
  try {
    const { sender, chat, fileUrl, text, sentAt, deliveredAt, readAt } =
      message;

    const messageData = {
      sender: sender, // uid
      chat: chat,
      fileUrl: fileUrl,
      text: text,
      sentAt: sentAt,
      deliveredAt: deliveredAt,
      readAt: readAt,
    };

    return await setDocData(docName, messageId, "", messageData);
  } catch (error) {
    throw error;
  }
};

export const updateMessageFirebase = async (messageId, message) => {
  try {
    const { sender, chat, fileUrl, text, sentAt, deliveredAt, readAt } =
      message;

    const messageData = {
      sender: sender, // uid
      chat: chat,
      fileUrl: fileUrl,
      text: text,
      sentAt: sentAt,
      deliveredAt: deliveredAt,
      readAt: readAt,
    };

    return await updateDocData(docName, messageId, "", messageData);
  } catch (error) {
    throw error;
  }
};

export const deleteMessageFirebase = async (messageId) => {
  try {
    return await deleteDocData(docName, messageId);
  } catch (error) {
    throw error;
  }
};
