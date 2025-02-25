import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function saveUserToFirestore(user: any, provider: "email" | "google") {
    if (!user) return;
  
    const userRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userRef);
  
    if (!userSnapshot.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        provider,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        role: "user",
        bio: "",
        preferences: {
          language: "zh",
          darkMode: false,
        },
      });
    } else {
      // Update existing user with latest login timestamp
      await setDoc(userRef, { updatedAt: serverTimestamp() }, { merge: true });
    }
  }
