import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = ({isAuth, children}) => {
    // const navigate = useNavigate();
    return isAuth ? children : < Navigate to="/signin"/>
}
  
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

export {
    ProtectedRoute,
    useQuery
}