// Real-time chat, backed by Firestore. Replaces the old local-only mock
// chatRooms (hardcoded conversations + a setTimeout that faked replies from
// "the seller"). Schema:
//
//   chats/{chatId}                      -- one doc per buyer<->product thread
//   chats/{chatId}/messages/{messageId} -- the actual messages
//
// chatId is deterministic (`${productId}_${buyerId}`) so re-opening a chat
// about the same item always finds the same thread instead of creating dupes.

import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  where,
  type Unsubscribe,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase';
import { Product } from '../types';

const CHATS_COLLECTION = 'chats';

export interface ChatMessage {
  id: string;
  senderId: string; // Firebase uid of the sender, or 'system' for system notices
  text: string;
  createdAt: number;
}

export interface ChatRoom {
  id: string;
  product: Product;
  buyerId: string;
  sellerId: string;
  participantIds: string[]; // [buyerId, sellerId] — used for the "my chats" query
  isCompleted: boolean;
  createdAt: number;
  lastMessageText: string;
  lastMessageAt: number;
}

const chatIdFor = (productId: string, buyerId: string) => `${productId}_${buyerId}`;

/** Subscribes to every chat the given user is a participant in (as buyer or seller). */
export const subscribeToMyChats = (
  uid: string,
  onChange: (rooms: ChatRoom[]) => void,
  onError: (error: unknown) => void
): Unsubscribe => {
  if (!isFirebaseConfigured) {
    onError(new Error('Firebase is not configured yet (src/firebase.ts still has placeholder values).'));
    return () => {};
  }
  const q = query(
    collection(db, CHATS_COLLECTION),
    where('participantIds', 'array-contains', uid),
    orderBy('lastMessageAt', 'desc')
  );
  return onSnapshot(
    q,
    (snapshot) => onChange(snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ChatRoom))),
    (error) => {
      console.error('[chatService] subscribeToMyChats failed:', error);
      onError(error);
    }
  );
};

/**
 * Finds the chat room for a buyer inquiring about a product, creating it
 * (with a starter system message) if it doesn't exist yet. Returns the chat ID.
 */
export const getOrCreateChatRoom = async (product: Product, buyerId: string): Promise<string> => {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured yet (src/firebase.ts still has placeholder values).');
  }
  const chatId = chatIdFor(product.id, buyerId);
  const ref = doc(db, CHATS_COLLECTION, chatId);
  const existing = await getDoc(ref);

  if (!existing.exists()) {
    const now = Date.now();
    const starterText = `🤝 New vicinity handshake discussion started for "${product.title}". Ask about item inspection or coordinate a meetup point.`;
    await setDoc(ref, {
      product,
      buyerId,
      sellerId: product.seller.id,
      participantIds: [buyerId, product.seller.id],
      isCompleted: false,
      createdAt: now,
      lastMessageText: starterText,
      lastMessageAt: now,
    });
    await addDoc(collection(db, CHATS_COLLECTION, chatId, 'messages'), {
      senderId: 'system',
      text: starterText,
      createdAt: now,
    });
  }

  return chatId;
};

/** Subscribes to the messages in a single chat room, oldest first. */
export const subscribeToChatMessages = (
  chatId: string,
  onChange: (messages: ChatMessage[]) => void,
  onError: (error: unknown) => void
): Unsubscribe => {
  const q = query(collection(db, CHATS_COLLECTION, chatId, 'messages'), orderBy('createdAt', 'asc'));
  return onSnapshot(
    q,
    (snapshot) => onChange(snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ChatMessage))),
    (error) => {
      console.error('[chatService] subscribeToChatMessages failed:', error);
      onError(error);
    }
  );
};

/** Sends a message and updates the room's last-message preview. */
export const sendChatMessage = async (chatId: string, senderId: string, text: string): Promise<void> => {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured yet (src/firebase.ts still has placeholder values).');
  }
  const now = Date.now();
  await addDoc(collection(db, CHATS_COLLECTION, chatId, 'messages'), {
    senderId,
    text,
    createdAt: now,
  });
  await updateDoc(doc(db, CHATS_COLLECTION, chatId), {
    lastMessageText: text,
    lastMessageAt: now,
  });
};

/**
 * Deletes every chat room the user takes part in, plus the messages inside
 * them. Called during account deletion so "delete my account" really removes
 * the user's conversation data instead of only signing them out.
 */
export const deleteAllChatsForUser = async (uid: string): Promise<void> => {
  if (!isFirebaseConfigured) return;
  const q = query(collection(db, CHATS_COLLECTION), where('participantIds', 'array-contains', uid));
  const rooms = await getDocs(q);
  for (const room of rooms.docs) {
    const messages = await getDocs(collection(db, CHATS_COLLECTION, room.id, 'messages'));
    await Promise.all(messages.docs.map((m) => deleteDoc(m.ref)));
    await deleteDoc(room.ref);
  }
};

/** Posts a system message and marks the room as a completed handshake. */
export const completeChatWithSystemMessage = async (chatId: string, ledgerText: string): Promise<void> => {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured yet (src/firebase.ts still has placeholder values).');
  }
  const now = Date.now();
  await addDoc(collection(db, CHATS_COLLECTION, chatId, 'messages'), {
    senderId: 'system',
    text: ledgerText,
    createdAt: now,
  });
  await updateDoc(doc(db, CHATS_COLLECTION, chatId), {
    isCompleted: true,
    lastMessageText: ledgerText,
    lastMessageAt: now,
  });
};
