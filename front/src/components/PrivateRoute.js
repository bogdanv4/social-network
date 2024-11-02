// import { Navigate, Route } from "react-router-dom";
// function PrivateRoute({ element, ...rest }) {
//   const isAuthenticated = localStorage.getItem("token");
//   return isAuthenticated ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/" replace />
//   );
// }
// export default PrivateRoute;

import { Navigate } from "react-router-dom";
function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/" replace />;
}
export default PrivateRoute;
