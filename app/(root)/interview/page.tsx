 
/* eslint-disable react/react-in-jsx-scope */
import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();
  // Handle case where user is not logged in
  if (!user) {
    // Redirect to login or show error
    return <div>Please log in to access this page</div>;
  }

  return (
    <>
      <h3>Interview generation</h3>

      <Agent
        userName={user.displayName || "Anonymous"} // Fallback for missing displayName
        userId={user.uid} // Changed from id to uid
        profileImage={user.photoURL || ""} // Changed from profileURL to photoURL
        type="generate"
      />
    </>
  );
};

export default Page;
