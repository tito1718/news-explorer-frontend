import { useContext } from "react";
import { Navigate } from "react-router";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function ProtectedRoute({ children }) {
  const currentUser = useContext(CurrentUserContext);

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
