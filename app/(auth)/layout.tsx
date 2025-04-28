"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/actions/auth.action";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<
    boolean | null
  >(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      setIsUserAuthenticated(authenticated);
      if (authenticated) {
        router.push("/sign-in"); // Redirect to sign-in page after authentication
      }
    };

    checkAuth();
  }, [router]);

  if (isUserAuthenticated === null) {
    return <div>Loading...</div>; // Add loading state while checking
  }

  return <div className="auth-layout">{children}</div>;
};

export default AuthLayout;
