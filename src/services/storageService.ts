// Uploads photos to Firebase Storage. Replaces the old placeholder behavior
// where "Add Photo" just inserted a random picsum.photos image.
//
// NOTE: Cloud Storage for Firebase requires the project to be on the Blaze
// (pay-as-you-go) billing plan as of Feb 2026 — even for usage that stays
// entirely within the free tier. See FIREBASE_SETUP.md.

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebaseApp, isFirebaseConfigured } from '../firebase';

const storage = getStorage(firebaseApp);

/**
 * Uploads a photo (as a Blob) for a listing and returns its public download URL.
 * Throws if Firebase isn't configured yet.
 */
export const uploadListingPhoto = async (sellerId: string, blob: Blob): Promise<string> => {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured yet (src/firebase.ts still has placeholder values).');
  }
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
  const storageRef = ref(storage, `listings/${sellerId}/${filename}`);
  await uploadBytes(storageRef, blob, { contentType: blob.type || 'image/jpeg' });
  return getDownloadURL(storageRef);
};

/** Converts a data: URL (what the Camera plugin returns) into a Blob for upload. */
export const dataUrlToBlob = async (dataUrl: string): Promise<Blob> => {
  const response = await fetch(dataUrl);
  return response.blob();
};
