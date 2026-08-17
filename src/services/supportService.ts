// Support tickets and abuse reports, backed by Firestore.
//
// These used to live in localStorage only, which meant a report never actually
// reached anyone — the UI said "routed to our team" while the data sat on the
// reporter's own device. App Store Guideline 1.2 / Play's UGC policy both
// require that reports genuinely reach the operator, so every ticket is now
// written to Firestore where Himpower staff can read it in the Firebase console.
//
// Collections:
//   support_tickets/{id}   -- bug reports, questions, safety disputes
//   reports/{id}           -- "report this listing" submissions

import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase';

export interface SupportTicket {
  id: string;
  reporterId: string;
  email: string;
  type: string;
  message: string;
  status: string;
  createdAt: number;
}

const TICKETS_COLLECTION = 'support_tickets';
const REPORTS_COLLECTION = 'reports';

/** Subscribes to the tickets the signed-in user has filed ("My Ticket History"). */
export const subscribeToMyTickets = (
  uid: string,
  onChange: (tickets: SupportTicket[]) => void,
  onError: (error: unknown) => void
): Unsubscribe => {
  if (!isFirebaseConfigured) {
    onError(new Error('Firebase is not configured yet.'));
    return () => {};
  }
  const q = query(
    collection(db, TICKETS_COLLECTION),
    where('reporterId', '==', uid),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(
    q,
    (snapshot) => onChange(snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as SupportTicket))),
    (error) => {
      console.error('[supportService] subscribeToMyTickets failed:', error);
      onError(error);
    }
  );
};

/** Files a support ticket. Visible to the reporter and to Himpower staff. */
export const submitSupportTicket = async (params: {
  reporterId: string;
  email: string;
  type: string;
  message: string;
}): Promise<void> => {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured yet.');
  }
  await addDoc(collection(db, TICKETS_COLLECTION), {
    reporterId: params.reporterId,
    email: params.email,
    type: params.type,
    message: params.message,
    status: 'Open (Pending Review)',
    createdAt: Date.now(),
    serverCreatedAt: serverTimestamp(),
  });
};

/**
 * Reports a listing/seller. Written to BOTH `reports` (the moderation queue
 * Himpower reviews) and `support_tickets` (so the reporter can see it in their
 * own ticket history and knows it wasn't silently dropped).
 */
export const submitListingReport = async (params: {
  reporterId: string;
  reporterEmail: string;
  productId: string;
  productTitle: string;
  sellerId: string;
  sellerName: string;
  reason: string;
}): Promise<void> => {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured yet.');
  }
  await addDoc(collection(db, REPORTS_COLLECTION), {
    ...params,
    status: 'Open (Pending Review)',
    createdAt: Date.now(),
    serverCreatedAt: serverTimestamp(),
  });
  await submitSupportTicket({
    reporterId: params.reporterId,
    email: params.reporterEmail,
    type: 'Safety Dispute',
    message: `Reported listing "${params.productTitle}" (seller: ${params.sellerName}). Reason: ${params.reason}`,
  });
};

/**
 * Removes the tickets a user filed. Called during account deletion.
 * Moderation `reports` are intentionally NOT deleted — they are safety records
 * about someone else's content, and this is disclosed in the privacy policy.
 */
export const deleteMyTickets = async (uid: string): Promise<void> => {
  if (!isFirebaseConfigured) return;
  const q = query(collection(db, TICKETS_COLLECTION), where('reporterId', '==', uid));
  const snapshot = await getDocs(q);
  await Promise.all(snapshot.docs.map((d) => deleteDoc(d.ref)));
};
