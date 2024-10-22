import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/useAuthStore";
import Loader from "../common/Loader";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent = (props: any) => {
    const navigate = useRouter();

    const { user } = useAuthStore();
    useEffect(() => {
      if (!user) {
        // Redirect to login if user is not authenticated
        navigate.replace("/");
      }
    }, [navigate, user]);

    // Render the protected component only if authenticated
    // You can also add a loading state to avoid a flicker during redirect
    if (!user) {
      return <Loader />; // You could also return a loading spinner or a blank div while redirecting
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
