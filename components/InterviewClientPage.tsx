"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";
import Agent from "@/components/Agent";

export default function InterviewClientPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchUser() {
      const userData = await getCurrentUser();
      if (!userData?.uid) {
        router.push("/sign-in");
      } else {
        setUser(userData);
      }
    }
    fetchUser();
  }, [router]);

  if (!user) {
    return <div>Loading...</div>; // Show loading while checking
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Interview Generation</h1>
      <Agent
        userName={user.displayName || "Anonymous"}
        userId={user.uid}
        photoURL={user.photoURL || "/default-avatar.png"}
        type="generate"
      />
    </div>
  );
}
