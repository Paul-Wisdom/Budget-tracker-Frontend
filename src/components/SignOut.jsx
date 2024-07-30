import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import authServices from "../services/Auth";

const SignOut = ({ setIsAuth }) => {
  useEffect(() => {
    authServices
      .signOut()
      .then((result) => {
        console.log(result);
        setIsAuth(false);
        // navigate('/signin')
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <Navigate to="/signin" />;
};

export { SignOut };
