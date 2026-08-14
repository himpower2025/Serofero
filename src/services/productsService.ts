// Live product listings, backed by Firestore instead of hardcoded mock data
// or localStorage. This is what makes listings real and shared between users
// instead of a single-device demo.

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
  getDocs,
  type Unsubscribe,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase';
import { Product } from '../types';

const PRODUCTS_COLLECTION = 'products';

/**
 * Subscribes to the live products feed. Calls `onChange` every time the data
 * changes (including the instant local update Firestore applies before the
 * server confirms a write, so new listings appear immediately).
 *
 * If Firebase hasn't been configured yet (see src/firebase.ts), this calls
 * `onError` immediately instead of hanging, so callers can fall back to
 * sample data for local development.
 */
export const subscribeToProducts = (
  onChange: (products: Product[]) => void,
  onError: (error: unknown) => void
): Unsubscribe => {
  if (!isFirebaseConfigured) {
    onError(new Error('Firebase is not configured yet (src/firebase.ts still has placeholder values).'));
    return () => {};
  }

  const q = query(collection(db, PRODUCTS_COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const products = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
      onChange(products);
    },
    (error) => {
      console.error('[productsService] subscribeToProducts failed:', error);
      onError(error);
    }
  );
};

/** Creates a new listing. Throws if Firebase isn't configured. */
export const createProduct = async (product: Omit<Product, 'id'>): Promise<string> => {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured yet (src/firebase.ts still has placeholder values).');
  }
  const ref = await addDoc(collection(db, PRODUCTS_COLLECTION), {
    ...product,
    createdAt: Date.now(),
  });
  return ref.id;
};

/** Marks a listing sold/unsold. Throws if Firebase isn't configured. */
export const setProductSold = async (productId: string, isSold: boolean): Promise<void> => {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured yet (src/firebase.ts still has placeholder values).');
  }
  await updateDoc(doc(db, PRODUCTS_COLLECTION, productId), { isSold });
};

/** Deletes a listing. Throws if Firebase isn't configured. */
export const deleteProduct = async (productId: string): Promise<void> => {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured yet (src/firebase.ts still has placeholder values).');
  }
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));
};

/**
 * Deletes every listing owned by a seller. Used by account deletion
 * (Apple Guideline 5.1.1(v) requires that "delete account" actually erases
 * the user's data, not just sign them out / clear the local cache).
 * No-ops silently if Firebase isn't configured, so local-only dev still works.
 */
export const deleteAllListingsBySeller = async (sellerId: string): Promise<void> => {
  if (!isFirebaseConfigured) return;
  const q = query(collection(db, PRODUCTS_COLLECTION), where('seller.id', '==', sellerId));
  const snapshot = await getDocs(q);
  await Promise.all(snapshot.docs.map((d) => deleteDoc(d.ref)));
};
