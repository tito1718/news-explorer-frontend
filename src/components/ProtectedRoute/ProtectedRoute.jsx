import { useContext, useEffect } from "react";
import { Navigate } from "react-router";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function ProtectedRoute({ children, onUnauthorized }) {
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (!currentUser) {
      onUnauthorized();
    }
  }, [currentUser, onUnauthorized]);

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
