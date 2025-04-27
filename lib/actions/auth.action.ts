/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

// Define proper user types
interface FirebaseUser {
  uid: string;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
}

interface SignUpParams {
  uid: string;
  displayName: string;
  email: string;
}

interface SignInParams {
  email: string;
  idToken: string;
}

// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24 * 7;

// Set session cookie
export async function setSessionCookie(idToken: string) {
  const cookieStore = cookies();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION * 1000,
  });

  (await cookieStore).set("session", sessionCookie, {
    maxAge: SESSION_DURATION,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function signUp(params: SignUpParams) {
  const { uid, displayName, email } = params;

  try {
    const userDoc = await db.collection("users").doc(uid).get();
    if (userDoc.exists) {
      return {
        success: false,
        message: "User already exists. Please sign in.",
      };
    }

    await db.collection("users").doc(uid).set({
      uid,
      displayName,
      email,
      createdAt: new Date().toISOString(),
    });

    return { success: true, message: "Account created successfully." };
  } catch (error: any) {
    console.error("Error creating user:", error);
    return {
      success: false,
      message:
        error.code === "auth/email-already-exists"
          ? "Email already in use"
          : "Failed to create account",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    await setSessionCookie(idToken);
    return { success: true };
  } catch (error: any) {
    console.error("Sign in error:", error);
    return {
      success: false,
      message:
        error.code === "auth/user-not-found"
          ? "User not found"
          : "Authentication failed",
    };
  }
}

export async function signOut() {
  (await cookies()).delete("session");
}

export async function getCurrentUser(): Promise<FirebaseUser | null> {
  const sessionCookie = (await cookies()).get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userDoc = await db.collection("users").doc(decodedClaims.uid).get();

    if (!userDoc.exists) return null;

    const userData = userDoc.data();
    return {
      uid: decodedClaims.uid,
      displayName: userData?.displayName || null,
      email: decodedClaims.email || null,
    };
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}

export async function isAuthenticated() {
  return !!(await getCurrentUser());
}
