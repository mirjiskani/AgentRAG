import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: Props) {
  const {
    accessToken,
    loading,
  } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!accessToken) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <>{children}</>;
}